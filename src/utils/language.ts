import i18n from '@/config/i18n';

export const languageUtils = {
    toggle: () => {
        const oldLang = i18n.language;
        const newLang = oldLang === 'vi' ? 'en' : 'vi';

        console.log('--- DEBUG LANGUAGE ---');
        console.log('Ngôn ngữ hiện tại (old):', oldLang);
        console.log('Ngôn ngữ mục tiêu (new):', newLang);

        i18n.changeLanguage(newLang)
            .then(() => {
                console.log('Đã đổi thành công sang:', i18n.language);
                console.log('-----------------------');
            })
            .catch((err) => {
                console.error('Lỗi khi đổi ngôn ngữ:', err);
            });
    },
};
