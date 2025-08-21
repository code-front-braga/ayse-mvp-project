import jsPDF from 'jspdf';

interface PurchaseProduct {
	id: string;
	name: string;
	category: string;
	price: number;
	quantity: number;
	total: number;
	description: string | null;
}

interface PurchaseData {
	id: string;
	supermarket: string;
	address: string | null;
	date: Date;
	total: number;
	status: string;
	totalProducts: number;
	totalQuantityItems: number;
	products: PurchaseProduct[];
}

export const generatePurchasePDF = (purchaseData: PurchaseData) => {
	const pdf = new jsPDF();
	const pageWidth = pdf.internal.pageSize.getWidth();
	const margin = 20;
	let yPosition = 30;

	pdf.setFontSize(20);
	pdf.setFont('helvetica', 'bold');
	pdf.text('Comprovante de Compra', pageWidth / 2, yPosition, { align: 'center' });
	yPosition += 20;

	pdf.setFontSize(12);
	pdf.setFont('helvetica', 'normal');

	pdf.text(`Supermercado: ${purchaseData.supermarket}`, margin, yPosition);
	yPosition += 10;

	if (purchaseData.address) {
		pdf.text(`Endereço: ${purchaseData.address}`, margin, yPosition);
		yPosition += 10;
	}

	const formattedDate = new Date(purchaseData.date).toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
	pdf.text(`Data da Compra: ${formattedDate}`, margin, yPosition);
	yPosition += 10;

	pdf.text(`Valor Total: R$ ${purchaseData.total.toFixed(2).replace('.', ',')}`, margin, yPosition);
	yPosition += 10;

	pdf.text(`Quantidade de Produtos: ${purchaseData.totalProducts}`, margin, yPosition);
	yPosition += 10;

	pdf.text(`Quantidade de Itens: ${purchaseData.totalQuantityItems}`, margin, yPosition);
	yPosition += 20;

	pdf.setFont('helvetica', 'bold');
	pdf.text('Lista de Produtos:', margin, yPosition);
	yPosition += 15;

	pdf.setFont('helvetica', 'normal');
	pdf.setFontSize(10);

	const tableHeaders = ['Produto', 'Categoria', 'Qtd', 'Preço Unit.', 'Total'];
	const colWidths = [60, 40, 20, 30, 30];
	let xPosition = margin;

	pdf.setFont('helvetica', 'bold');
	tableHeaders.forEach((header, index) => {
		pdf.text(header, xPosition, yPosition);
		xPosition += colWidths[index];
	});
	yPosition += 10;

	pdf.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
	yPosition += 5;

	pdf.setFont('helvetica', 'normal');

	purchaseData.products.forEach((product) => {
		if (yPosition > 270) {
			pdf.addPage();
			yPosition = 30;
		}

		xPosition = margin;

		const productName = product.name.length > 25 
			? product.name.substring(0, 25) + '...' 
			: product.name;
		pdf.text(productName, xPosition, yPosition);
		xPosition += colWidths[0];

		const category = product.category.length > 15 
			? product.category.substring(0, 15) + '...' 
			: product.category;
		pdf.text(category, xPosition, yPosition);
		xPosition += colWidths[1];

		pdf.text(product.quantity.toString(), xPosition, yPosition);
		xPosition += colWidths[2];

		pdf.text(`R$ ${product.price.toFixed(2).replace('.', ',')}`, xPosition, yPosition);
		xPosition += colWidths[3];

		pdf.text(`R$ ${product.total.toFixed(2).replace('.', ',')}`, xPosition, yPosition);

		yPosition += 8;
	});

	yPosition += 10;
	pdf.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
	yPosition += 10;

	pdf.setFont('helvetica', 'bold');
	pdf.setFontSize(12);
	pdf.text(`Total Geral: R$ ${purchaseData.total.toFixed(2).replace('.', ',')}`, pageWidth - margin - 50, yPosition, { align: 'right' });

	const fileName = `compra-${purchaseData.supermarket.toLowerCase().replace(/\s+/g, '-')}-${new Date(purchaseData.date).toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
	pdf.save(fileName);
};