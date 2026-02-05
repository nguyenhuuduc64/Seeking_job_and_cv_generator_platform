import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// ✅ Định nghĩa Styles tương ứng với CSS của bản Web
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 30,
        padding: 10,
        width: '100%',
    },
    // --- BÊN TRÁI: AVATAR ---
    avatarContainer: {
        width: 120, // Tương đương w-32
        height: 150, // Tương đương h-40
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#D1D5DB', // gray-300
        backgroundColor: '#F3F4F6', // gray-200
    },
    avatar: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    // --- BÊN PHẢI: THÔNG TIN ---
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    fullName: {
        fontSize: 22,
        fontWeight: 900,
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
        color: '#000',
    },
    position: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#6B7280', // gray-500
        marginBottom: 10,
    },
    // Các trường chi tiết
    detailRow: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    label: {
        width: 80,
        fontSize: 10,
        fontWeight: 900,
        fontFamily: 'Roboto',
        color: '#000',
    },
    value: {
        flex: 1,
        fontSize: 10,
        fontFamily: 'Roboto',
        color: '#4B5563', // gray-600
    },
});

interface PersonalInfoPDFProps {
    data: {
        fullName?: string;
        position?: string;
        dob?: string;
        gender?: string;
        phone?: string;
        email?: string;
        website?: string;
        address?: string;
        avatarUrl?: string;
    };
}

const PersonalInfoPDF = ({ data }: PersonalInfoPDFProps) => (
    <View style={styles.container}>
        {/* --- KHỐI AVATAR --- */}
        <View style={styles.avatarContainer}>
            {data.avatarUrl ? <Image src={data.avatarUrl} style={styles.avatar} /> : null}
        </View>

        {/* --- KHỐI THÔNG TIN CHI TIẾT --- */}
        <View style={styles.infoContainer}>
            <Text style={styles.fullName}>{data.fullName || 'HỌ VÀ TÊN'}</Text>
            <Text style={styles.position}>{data.position || 'Vị trí ứng tuyển'}</Text>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Ngày sinh:</Text>
                <Text style={styles.value}>{data.dob}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Giới tính:</Text>
                <Text style={styles.value}>{data.gender}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Số điện thoại:</Text>
                <Text style={styles.value}>{data.phone}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{data.email}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Website:</Text>
                <Text style={styles.value}>{data.website}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Địa chỉ:</Text>
                <Text style={styles.value}>{data.address}</Text>
            </View>
        </View>
    </View>
);

export default PersonalInfoPDF;
