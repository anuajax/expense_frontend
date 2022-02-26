import jsPDF from 'jspdf';
import 'jspdf-autotable';
export const PrintPDF = (dataToPrint) => {
const curdate = new Date().toDateString('en-IN'); 
const doc = new jsPDF();

doc.autoTable({
    theme: 'striped',
    headStyles: { fillColor: [200,0,0]},
    margin: { top: 10},
    body: dataToPrint.filter(d => !d.type).map(d => { return  { date: d.date, amount: d.amount, item: d.name, type: 'Expense'}}),
    columns: [{ header: 'Date', dataKey: 'date' }, { header: 'Amount', dataKey: 'amount' },{ header: 'Name', dataKey: 'item' }, {header: 'I / E', dataKey: 'type'}],
    
});
doc.autoTable({
    theme: 'striped',
    margin: {top: 10},
    body: dataToPrint.filter(d => d.type).map(d => { return  { date: d.date, amount: d.amount, item: d.name, type: 'Income'}}),
    columns: [{ header: 'Date', dataKey: 'date' }, { header: 'Amount', dataKey: 'amount' },{ header: 'Name', dataKey: 'item' }, {header: 'I / E', dataKey: 'type'}],
})

// doc.save(`${curdate}_export.pdf`);
doc.output('dataurlnewwindow');
}