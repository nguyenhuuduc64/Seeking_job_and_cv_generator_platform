import { useQuery } from "@tanstack/react-query";
import { userFields, type UserType } from "@/types";
import { UserService, } from "@/services/userService";
import { DataTable } from "./users/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { SchemaForm } from "@/components/common/forms/SchemaForm";
import { useAppDispatch } from "@/hooks/redux";
import { useQueryClient } from "@tanstack/react-query";
import { getColumns } from "./users/columns";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { closeForm, openForm, setFormValues } from "@/features/modal/formSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faChevronDown, faTrashAlt, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const UserManagement = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [deleteId, setDeleteId] = useState<string | number>('');
    const navigate = useNavigate();
    const fetchUsers = async () => {
        const response = await UserService.getUsers();
        console.log(response);
        return response.result;
    }
    const formValues = useSelector((state: RootState) => state.form.formValues);
    const { data: users, isLoading, isError, error } = useQuery({
        queryKey: ['users'], // Khóa định danh để caching
        queryFn: fetchUsers, // Hàm thực hiện gọi API
    })

    const handleRowClick = (row: UserType) => {
        console.log(row);
        setSelectedUser(row);
    };

    const handleCreateUser = async (data: any) => {
        console.log(data);
        await UserService.createUser(data);
        queryClient.invalidateQueries({ queryKey: ['users'] });
    }

    const handleUpdateUser = async (data: any) => {
        console.log('data page', data);
        await UserService.updateUser(data);
        queryClient.invalidateQueries({ queryKey: ['users'] });
    }

    const handleOpenEditForm = (user: UserType) => {
        // 💡 Chỉ lấy đúng cái giá trị "user" hoặc "admin" thưa ông chủ
        const dataForForm = {
            ...user,
            roles: user.roles?.name // Kết quả: "user" (chuỗi thuần túy)
        };

        // Gửi dữ liệu "sạch" vào Redux
        dispatch(setFormValues(dataForForm));

        setSelectedUser(user);
        dispatch(openForm("updateUserForm"));
    };

    const handleOpenDeleteForm = (id: string | number) => {
        setDeleteId(id);
        dispatch(openForm('deleteUserForm'));
    }

    const handleDeleteUser = async () => {
        await UserService.deleteUser(deleteId);
        queryClient.invalidateQueries({ queryKey: ['users'] });
    }

    const handleViewDetailUser = () => {
        navigate(`/admin/nguoi-dung/${selectedUser?.id}`);
    }

    const tableColumns = getColumns({ onDelete: handleOpenDeleteForm, onEdit: handleOpenEditForm });

    return (
        <div className="space-y-6 p-6">
            <SchemaForm name="userForm" schema={userFields} onSubmit={handleCreateUser} />
            <SchemaForm
                name="updateUserForm"
                schema={userFields}
                onSubmit={handleUpdateUser}
                defaultValues={formValues}
                key={selectedUser?.id} // Quan trọng để reset form
            />
            <SchemaForm name="deleteUserForm" onSubmit={handleDeleteUser}>
                <div className="flex flex-col space-y-4">
                    {/* Header: Icon và Tiêu đề thưa ông chủ */}
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-500 text-xl" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-[#1a2b3b]">Delete Form</h2>
                            <p className="text-gray-500 mt-2 text-lg leading-relaxed">
                                Are you sure you would like to delete the user
                                <span className="font-semibold text-gray-800"> '{selectedUser?.fullName}'</span>?
                            </p>
                        </div>
                    </div>

                    {/* Footer: Cụm nút bấm căn phải thưa ông chủ */}
                    <div className="flex justify-end items-center gap-3 mt-8 pt-4 border-t border-gray-50">
                        <button
                            type="button"
                            onClick={() => dispatch(closeForm())}
                            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-all shadow-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#c5163d] hover:bg-[#a01232] text-white font-semibold rounded-md shadow-sm transition-all active:scale-95"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </SchemaForm>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-blue-900">Quản lý người dùng</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Bảng danh sách - Chiếm 3/4 chiều ngang */}

                <div className="lg:col-span-3">
                    <DataTable
                        columns={tableColumns}
                        data={users || []}
                        onRowClick={handleRowClick}
                    // Mẹo: Thêm sự kiện click vào row trong DataTable nếu ông chủ muốn
                    />
                </div>

                {/* Khu vực thông tin chi tiết - Chiếm 1/4 chiều ngang */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-6 border-blue-100 shadow-sm">
                        <CardHeader className="bg-slate-50/50">
                            <CardTitle className="text-lg font-semibold text-slate-700">
                                Thông tin người dùng
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {selectedUser ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase font-bold">Họ và Tên</label>
                                        <p className="text-sm font-medium">{selectedUser.fullName}</p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase font-bold">Email</label>
                                        <p className="text-sm">{selectedUser.email}</p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase font-bold">Trạng thái</label>
                                        <div className="mt-1">
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                Đang hoạt động
                                            </Badge>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <div className="flex items-center justify-between cursor-pointer hover:bg-slate-50/50 p-2 rounded-md" onClick={handleViewDetailUser}>
                                            <p>Xem chi tiết</p>
                                            <FontAwesomeIcon icon={faAngleRight} className="text-slate-500" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-sm text-slate-400 italic">
                                        Chọn một người dùng từ bảng để xem chi tiết thưa ông chủ.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
