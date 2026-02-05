import { Document, Page } from '@react-pdf/renderer';
import { useEffect } from 'react';
import ObjectivePDF from './react-pdf/ObjectivePDF';
import PersonalInfoInputBlockPDF from './react-pdf/PersonnalInfoPDF';
import ExperiencePDF from './react-pdf/ExperiencePDF';
import EducationPDF from './react-pdf/EducationPDF';
import CertificatePDF from './react-pdf/CertificatePDF';
const MyCVDocument = ({ cvData }: any) => {
    useEffect(() => {
        console.log('cvData', cvData);
    }, []);
    return (
        <Document>
            <Page size="A4" style={{ padding: 40 }}>
                {/* Duyệt mảng blocks và render component PDF tương ứng */}
                {cvData.map((block: any) => {
                    if (block.type === 'OBJECTIVE') {
                        return <ObjectivePDF key={block.id} data={block.data} />;
                    }
                    if (block.type === 'PERSONAL_INFO') {
                        return <PersonalInfoInputBlockPDF key={block.id} data={block.data} />;
                    }
                    if (block.type === 'EXPERIENCE') {
                        return <ExperiencePDF key={block.id} data={block.data} />;
                    }
                    if (block.type === 'EDUCATION') {
                        return <EducationPDF key={block.id} data={block.data} />;
                    }
                    if (block.type === 'CERTIFICATE') {
                        return <CertificatePDF key={block.id} data={block.data} />;
                    }
                    // return các PDF block khác...
                    return null;
                })}
            </Page>
        </Document>
    );
};

export default MyCVDocument;
