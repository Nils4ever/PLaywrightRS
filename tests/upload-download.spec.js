const ExcelJs = require('exceljs');
const { test, expect } = require("@playwright/test");


async function writeExcelTest(searchText,replaceText,filePath) 
{
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row,output.column);
    cell.value =replaceText;
    await workbook.xlsx.writeFile(filePath)
}
async function readExcel(worksheet,searchText)
{
    let output ={row :-1 ,column :-1};

     worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => 
            {
             if (cell.value == searchText)
                {
                 output.row =rowNumber;
                 output.column= colNumber;

                }
            })

        })
    return output ;
}
//writeExcelTest("Mango","Rabbit","C:/Users/bagaln/Downloads/download1.xlsx");
test('upload-download excel validation',async({page})=>
{

    await page.goto ("https://rahulshettyacademy.com/upload-download-test/index.html");
    await page.getByRole('button',{name:'Download'}).click();
})