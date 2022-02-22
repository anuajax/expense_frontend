import jsPDF from 'jspdf';
import 'jspdf-autotable';

const doc = new jsPDF();
doc.autoTable({
    head: []
})