export function generatePDF() {
    const element = document.getElementById('print-block');

    element.classList.add('pdf-mode');

    console.time('pdf');

    const opt = {
        margin: 0,
        filename: 'Пьеса.pdf',
        image: { type: 'jpeg', quality: 0.7 },
    html2canvas: { scale: 1.5, letterRendering: false },
        jsPDF: {
            unit: 'pt',
            format: 'a4',
            orientation: 'portrait',
        },
        pagebreak:
        {
            mode: ['css'],
            before: '.pdf-soft-break'
        },
    };

    html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
            console.timeEnd('pdf');
            element.classList.remove('pdf-mode');
        })
        .catch((error) => {
            console.log(error);
            console.timeEnd('pdf');
            element.classList.remove('pdf-mode');
        });
}

export function printPlay() {
  const el = document.getElementById('print-block');
  if (!el) return;

  const printWindow = window.open('', '_blank');
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
                    <link rel="stylesheet" href="/assets/css/styles.min.css" />
                    <style>
                        html, body {
                            height: auto !important;
                            min-height: auto !important;
                            overflow: visible !important;
                        }

                        #print-block {
                            height: auto !important;
                            min-height: auto !important;
                            width: 100%; !important;
                            max-width: 100%; !important;
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
                            body {
                                background: white !important;
                            }

                            .stage-single__content {
                                display: flex;
                                position: relative;
                                width: 100%;
                                flex-direction: column;
                                justify-content: flex-start;
                                align-items: center; /* чтобы не центрировалось */
                                font-family: Inter, Arial;
                                text-align: center;
                                font-size: 14px;
                                line-height: 1.3;
                                gap:12px;
                            }

                            /* Универсальный отступ между элементами */

                            .stage-single__content button[data-sound-src] {
                                display: none;
                            }

                            .stage-single__content h3 {
                                font-size: 24px;
                                display:block;
                                text-align:center;
                            }
                            .stage-single__content p {
                                margin: 0;
                                padding: 0;
                                text-align:left;
                                align-self: flex-start
                            }

                            .stage-single__content i {
                                display:inline-flex;
                                width:auto;
                                flex-direction:column;
                                margin-bottom: 10px;
                                margin-top: 10px;
                                font-style: italic;
                                font-weight: 500;
                            }

                            .stage-single__content i:before,
                            .stage-single__content i:after {
                                content: none;
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
