import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
    },
    headerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 2,
        marginBottom: 10,
    },
    titleBlock: {
        fontSize: 12,
        fontWeight: 700, // ✅ Sử dụng 700 thay vì 'bold' hoặc 500
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
    },
    contentRow: {
        flexDirection: 'row',
        width: '100%',
    },
    leftColumn: {
        width: '25%',
    },
    periodText: {
        fontSize: 10,
        fontWeight: 400, // 🛠️ QUAN TRỌNG: Đã sửa từ 500 thành 400 để tránh lỗi NaN
        color: '#6B7280',
        fontFamily: 'Roboto',
    },
    rightColumn: {
        width: '75%',
        flexDirection: 'column',
        gap: 2,
    },
    schoolName: {
        fontSize: 11,
        fontWeight: 700, // ✅ Đảm bảo dùng 700
        color: '#1F2937',
        fontFamily: 'Roboto',
    },
    majorText: {
        fontSize: 10,
        fontWeight: 400,
        color: '#6B7280',
        fontFamily: 'Roboto',
    },
    descriptionText: {
        fontSize: 10,
        color: '#374151',
        fontFamily: 'Roboto',
        marginTop: 2,
        lineHeight: 1.4,
        fontWeight: 400,
    },
});

interface EducationPDFProps {
    data: {
        period?: string;
        school?: string;
        major?: string;
        description?: string;
    };
}

const EducationPDF = ({ data }: EducationPDFProps) => (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.titleBlock}>Học vấn</Text>
        </View>

        <View style={styles.contentRow}>
            <View style={styles.leftColumn}>
                <Text style={styles.periodText}>{data?.period || 'Bắt đầu - Kết thúc'}</Text>
            </View>

            <View style={styles.rightColumn}>
                <Text style={styles.schoolName}>{data?.school || 'Tên trường học'}</Text>
                <Text style={styles.majorText}>{data?.major || 'Ngành học / Môn học'}</Text>
                <Text style={styles.descriptionText}>
                    {data?.description || 'Mô tả quá trình học tập...'}
                </Text>
            </View>
        </View>
    </View>
);

export default EducationPDF;
