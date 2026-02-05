import { Text, View, StyleSheet } from '@react-pdf/renderer';

// ✅ Styles mô phỏng Grid và Border của bản Web
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
    },
    // Tiêu đề khối
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
    // Từng dòng kinh nghiệm
    itemRow: {
        flexDirection: 'row',
        marginBottom: 12,
        width: '100%',
    },
    // Cột bên trái (Thời gian - tương đương col-span-3)
    periodColumn: {
        width: '25%',
    },
    periodText: {
        fontSize: 10,
        color: '#6B7280', // gray-500
        fontFamily: 'Roboto',
    },
    // Cột bên phải (Nội dung - tương đương col-span-9)
    contentColumn: {
        width: '75%',
    },
    companyName: {
        fontSize: 11,
        fontWeight: 700,
        color: '#1F2937', // gray-800
        fontFamily: 'Roboto',
    },
    positionText: {
        fontSize: 10,
        fontWeight: 600,
        color: '#374151', // gray-700
        fontFamily: 'Roboto',
        marginTop: 2,
    },
    descriptionText: {
        fontSize: 10,
        color: '#4B5563', // gray-600
        fontFamily: 'Roboto',
        marginTop: 4,
        lineHeight: 1.4,
    },
});

export interface ExperienceItem {
    period: string;
    company: string;
    position: string;
    description: string;
}

export interface ExperienceData {
    title?: string;
    list: ExperienceItem[];
}

const ExperiencePDF = ({ data }: { data: ExperienceData }) => (
    <View style={styles.container}>
        {/* TIÊU ĐỀ KHỐI */}
        <View style={styles.headerContainer}>
            <Text style={styles.titleBlock}>{data.title || 'KINH NGHIỆM LÀM VIỆC'}</Text>
        </View>

        {/* DANH SÁCH KINH NGHIỆM */}
        <View>
            {data?.list?.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                    {/* BÊN TRÁI: THỜI GIAN */}
                    <View style={styles.periodColumn}>
                        <Text style={styles.periodText}>{item.period || 'Thời gian'}</Text>
                    </View>

                    {/* BÊN PHẢI: CHI TIẾT CÔNG TY & VỊ TRÍ */}
                    <View style={styles.contentColumn}>
                        <Text style={styles.companyName}>{item.company || 'Tên công ty'}</Text>
                        <Text style={styles.positionText}>{item.position || 'Vị trí'}</Text>
                        <Text style={styles.descriptionText}>
                            {item.description || 'Mô tả công việc...'}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    </View>
);

export default ExperiencePDF;
