const fs = require('fs');

const filename = 'README.md';  // Имя вашего исходного файла
const outputFolder = 'many_books';  // Имя папки для сохранения отдельных файлов

// Создание папки для сохранения отдельных файлов
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const sections = data.split('##');  // Разделение файла на разделы по флагу "##"

    // Обработка каждого раздела и сохранение в отдельный файл
    sections.slice(1).forEach((section, index) => {
        section = section.trim();  // Удаление пробелов и переводов строк в начале и конце раздела
        const lines = section.split('\n');  // Разделение раздела на строки
        const firstLine = replaceSpacesDigitsAndQuestionMark(lines[0].trim());  // Получение первой строки и удаление пробелов в начале и конце
        const outputFilename = `${outputFolder}/${firstLine}.md`;

        fs.writeFile(outputFilename, '## ' + section, 'utf8', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Файл ${outputFilename} успешно создан.`);
        });
    });
});

function replaceSpacesDigitsAndQuestionMark(str) {
    return str.replace(/ /g, '_').replace(/\d+\./g, '').replace(/\?/g, '');
}