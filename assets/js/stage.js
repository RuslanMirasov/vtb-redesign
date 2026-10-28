export function generatePDF() {
  const element = document.getElementById('print-block');
  const oldMaxWidth = element.style.maxWidth;
  element.style.maxWidth = '100%';
  const opt = {
    margin: 10,
    filename: 'Пьеса.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1, letterRendering: true },
    jsPDF: {
      unit: 'pt',
      format: 'letter',
      orientation: 'portrait',
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      element.style.maxWidth = oldMaxWidth;
    })
    .catch(() => {
      element.style.maxWidth = oldMaxWidth;
    });
}

export function printPlay() {
  const el = document.getElementById('print-block');
  if (!el) return;

  const printWindow = window.open('', '_blank', 'width=800,height=600');
  if (!printWindow) return;

  const doc = printWindow.document;

  doc.open();
  doc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="theme-color" content="#0A2896" />
                    <meta name="description" content="description" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="preload" as="image" href="/vtb/assets/img/header/bg.webp" />
                    <link rel="preload" as="image" href="/vtb/assets/img/header/column-left.webp" />
                    <link rel="preload" as="image" href="/vtb/assets/img/header/column-right.webp" />
                    <link rel="preload" as="image" href="/vtb/assets/img/logo.svg" />
                    <link rel="icon" type="image/x-icon" href="/vtb/assets/img/favicon.ico" />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
                    <link rel="stylesheet" href="/vtb/assets/css/styles.min.css" />
                    <style>
                        html, body {
                            height: auto !important;
                            min-height: auto !important;
                            overflow: visible !important;
                        }

                        #print-block {
                            height: auto !important;
                            min-height: auto !important;
                            overflow: visible !important;
                            position: static !important;
                            transform: none !important;
                        }

                        .swiper, .swiper-wrapper {
                            height: auto !important;
                            overflow: visible !important;
                            transform: none !important;
                        }

                        .swiper-slide {
                            display: block !important;
                            width: 100% !important;
                            page-break-inside: avoid;
                        }

                        @media print {
                            * {
                                -webkit-print-color-adjust: exact;
                                print-color-adjust: exact;
                            }
                        }
                    </style>
                    <title>Путешествие Конька-Горбунка</title>
                </head>
                <body>
            `);
  doc.close();

  const clone = el.cloneNode(true);
  doc.body.appendChild(clone);

  const doPrint = () => {
    void doc.body.offsetHeight;

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 100);
  };

  if (printWindow.document.readyState === 'complete') {
    doPrint();
  } else {
    printWindow.addEventListener('load', function onLoad() {
      printWindow.removeEventListener('load', onLoad);
      doPrint();
    });
  }
}
