function printImage(url) {
    const w = window.open('', '_blank');

    w.document.write(
        `
            <!doctype html>
            <html>
            <head>
            <meta charset="utf-8" />
            <title>Раскраска</title>
            <style>
            @page {
                margin: 0;
            }

            html, body {
                margin: 0;
                padding: 0;
                height: 100%;
            }

            body {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            img {
                max-width: 100vw;
                max-height: 100vh;
                object-fit: contain; /* пропорционально, без обрезки */
            }

            @media print {
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            </style>
            </head>
            <body>
                <img src="${url}" onload="window.print(); window.close();" />
        `);

    w.document.close();
}