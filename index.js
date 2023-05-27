const fs = require('fs');

const filename = 'README.md';  // Имя вашего исходного файла
const outputFolder = 'output_folder';  // Имя папки для сохранения отдельных файлов

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
        const outputFilename = `${outputFolder}/section_${index + 1}.md`;

        fs.writeFile(outputFilename, '##' + section, 'utf8', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Файл ${outputFilename} успешно создан.`);
        });
    });
});