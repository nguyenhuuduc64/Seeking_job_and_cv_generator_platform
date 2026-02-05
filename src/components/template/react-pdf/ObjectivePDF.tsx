import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { useEffect } from 'react';

// ✅ Đăng ký Font chữ để hiển thị được Tiếng Việt (Rất quan trọng)
Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

// ✅ Định nghĩa Styles tương đương với Tailwind của ông chủ
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
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
    },
    content: {
        fontSize: 10,
        color: '#4B5563', // tương đương gray-600
        fontFamily: 'Roboto',
        lineHeight: 1.5,
    },
});

interface ObjectivePDFProps {
    data: { content?: string };
}

// ✅ Đây là component sẽ xuất hiện trong file PDF
const ObjectivePDF = ({ data }: ObjectivePDFProps) => {
    useEffect(() => {
        console.log(data);
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Mục tiêu nghề nghiệp</Text>
            </View>
            <Text style={styles.content}>{data.content || 'Chưa có nội dung mục tiêu...'}</Text>
        </View>
    );
};

export default ObjectivePDF;
