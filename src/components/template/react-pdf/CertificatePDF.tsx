import { Text, View, StyleSheet } from '@react-pdf/renderer';

// ✅ Styles đồng bộ với các khối Experience và Education
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
    },
    // Tiêu đề khối (CHỨNG CHỈ)
    headerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 2,
        marginBottom: 10,
    },
    titleBlock: {
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
    },
    // Nội dung danh sách
    listContainer: {
        flexDirection: 'column',
        gap: 6,
    },
    itemRow: {
        flexDirection: 'row',
        width: '100%',
    },
    // Cột trái: Thời gian (25%)
    leftColumn: {
        width: '25%',
    },
    timeText: {
        fontSize: 10,
        color: '#6B7280', // gray-500
        fontFamily: 'Roboto',
    },
    // Cột phải: Tên chứng chỉ (75%)
    rightColumn: {
        width: '75%',
    },
    nameText: {
        fontSize: 10,
        fontWeight: 500,
        color: '#1F2937', // gray-800
        fontFamily: 'Roboto',
    },
});

export interface CertificateItem {
    time: string;
    name: string;
}

export interface CertificateData {
    title?: string;
    list: CertificateItem[];
}

const CertificatePDF = ({ data }: { data: CertificateData }) => (
    <View style={styles.container}>
        {/* TIÊU ĐỀ KHỐI */}
        <View style={styles.headerContainer}>
            <Text style={styles.titleBlock}>{data.title || 'CHỨNG CHỈ'}</Text>
        </View>

        {/* DANH SÁCH CHỨNG CHỈ */}
        <View style={styles.listContainer}>
            {data?.list?.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                    {/* Cột trái: Thời gian */}
                    <View style={styles.leftColumn}>
                        <Text style={styles.timeText}>{item.time || 'Thời gian'}</Text>
                    </View>

                    {/* Cột phải: Tên chứng chỉ */}
                    <View style={styles.rightColumn}>
                        <Text style={styles.nameText}>{item.name || 'Tên chứng chỉ'}</Text>
                    </View>
                </View>
            ))}
        </View>
    </View>
);

export default CertificatePDF;
