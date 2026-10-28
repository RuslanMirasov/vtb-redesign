export const initPrint = () => {
////  const button = document.querySelector('[data-print]');
////  const content = document.querySelector(`${button?.dataset?.print}`);

////  if (!button || !content) return;

////  button.addEventListener('click', () => {
////    // создаём новое окно — размеров не задаём, браузер сам адаптирует
////    const printWindow = window.open();

////    if (!printWindow) return alert('Не удалось открыть окно печати');

////    // HTML в новом окне
////    printWindow.document.write(`
////      <html>
////        <head>
////          <title>Печать</title>
////          <style>
////@page {
////  margin: 20mm 15mm;
////}

////@media print {
////   body { 
////      padding: 30px 40px;
////      background: white !important; 
////   }

////   .stage-single__content {
////      display: flex;
////      position: relative;
////      width: 100%;
////      flex-direction: column;
////      justify-content: flex-start;
////      align-items: center; /* чтобы не центрировалось */
////      font-family: Inter, Arial;
////      text-align: center;
////      font-size: 14px;
////      line-height: 1.3;
////      gap:12px;
////   }

////   /* Универсальный отступ между элементами */

////   .stage-single__content button[data-sound-src] {
////      display: none;
////   }

////   .stage-single__content h3 {
////      font-size: 24px;
////      display:block;
////      text-align:center;
////   }
////   .stage-single__content p {
////      margin: 0;
////      padding: 0;
////      text-align:left;
////      align-self: flex-start
////   }

////   .stage-single__content i {
////      display:inline-flex;
////      width:auto;
////      flex-direction:column;
////      margin-bottom: 10px;
////      margin-top: 10px;
////      font-style: italic;
////      font-weight: 500;
////   }

////   .stage-single__content i:before,
////   .stage-single__content i:after {
////      content: none;
////   }
////}
////</style>

////        </head>
////        <body>
////         <div class="stage-single__content">
////            ${content.innerHTML}
////         </div>
////        </body>
////      </html>
////    `);

////    printWindow.document.close();
////    printWindow.onload = () => {
////      printWindow.focus();
////      printWindow.print();
////      printWindow.close();
////    };
////  });
};
