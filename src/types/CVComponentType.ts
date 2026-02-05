import PersonalInfoInputBlock from '../components/template/react-to-print/PersonalInfoInputBlock';
import ObjectiveInputBlock from '../components/template/react-to-print/ObjectiveInputBlock';
import EducationInputBlock from '../components/template/react-to-print/EducationInputBlock';
import ExperienceInputBlock from '../components/template/react-to-print/ExperienceInputBlock';
import CertificateInputBlock from '../components/template/react-to-print/CertificateInputBlock';
export const CVComponentType = {
    OBJECTIVE: [ObjectiveInputBlock, ObjectiveInputBlock, ObjectiveInputBlock, ObjectiveInputBlock],
    PERSONAL_INFO: [PersonalInfoInputBlock],
    EDUCATION: [EducationInputBlock],
    EXPERIENCE: [ExperienceInputBlock],
    CERTIFICATE: [CertificateInputBlock],
};
