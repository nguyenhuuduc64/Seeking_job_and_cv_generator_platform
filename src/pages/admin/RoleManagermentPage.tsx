import { DataTable } from "./roles/data-table"
import { getRoleColumns } from "./roles/columns"
import instance from "@/config/axios";
import { useContext, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { openForm } from "@/features/modal/formSlice";
import { SchemaForm } from "@/components/common/forms/SchemaForm";
import { addRoleField } from "@/types";
import { RoleService } from "@/services/roleService";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // Thêm useMutation và useQueryClient
import { closeForm } from "@/features/modal/formSlice"; // Để đóng form sau khi xong

const RoleManagermentPage = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const { data: rolesData, isLoading: rolesLoading } = useQuery({
        queryKey: ['roles'],
        queryFn: async () => (await instance.get('/roles')).data,
    });

    const { data: usersData, isLoading: usersLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => (await instance.get('/users')).data,
    });

    const addRoleMutation = useMutation({
        mutationFn: (newRole: any) => RoleService.addRole(newRole),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['roles'] });
            dispatch(closeForm());
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const deleteRoleMutation = useMutation({
        mutationFn: (roleName: string) => RoleService.deleteRole(roleName), // Giả sử service có hàm này
        onSuccess: async () => {
            // Xóa xong cũng ra lệnh cho TanStack Query làm mới danh sách
            await queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
        onError: (error) => {
            console.error("Xóa thất bại rồi ông chủ ơi:", error);
        }
    });

    const columns = useMemo(() => {
        const currentUsers = usersData?.result || [];
        return getRoleColumns({
            users: currentUsers,
            roles: rolesData?.result || [],
            onDelete: (name: string) => deleteRoleMutation.mutate(name),
        });
    }, [usersData, rolesData]); // Thêm rolesData vào deps để đồng bộ
    // Bước 3: Cập nhật hàm handleAddRole
    const handleAddRole = async (data: any) => {
        addRoleMutation.mutate(data); // Gọi mutation thay vì gọi trực tiếp service
    }
    return (
        <div className="lg:col-span-3">
            <DataTable
                columns={columns}
                data={rolesData?.result || []}
                filterColumn="name"
                filterPlaceholder="Tìm kiếm vai trò..."
                onAddClick={() => {
                    dispatch(openForm('addRoleForm'))
                    console.log('addRoleForm');
                }}
                addButtonText="Thêm vai trò"
            />

            <SchemaForm
                name="addRoleForm"
                schema={addRoleField}
                onSubmit={handleAddRole}
            />
        </div>
    );
};

export default RoleManagermentPage;