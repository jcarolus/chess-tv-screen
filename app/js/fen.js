(function(window, document) {

    window.app = window.app || {};

    window.app.loadFEN = function(sFEN, selector, squareSize) {

        var getPos = function(col) {
            var row = 0;
            while (col >= 8) {
                row++;
                col -= 8;
            }
            return {
                col: col,
                row: row
            };
        };

        var boardElt = document.getElementById(selector);
        boardElt.style.width = (squareSize * 8) + 'px';
        boardElt.style.height = (squareSize * 8) + 'px';

        // FEN example
        // 1b6/4Q3/q3PpK1/3Bkp2/1npRp1p1/r5P1/2NN2rB/4R3 w - - 0 1
        var fragments = sFEN.split(/\s/g)[0];
        var i;

        for (i = 0; i < 64; i++) {
            var col = i % 8;
            var row = i === 0 ? 0 : (Math.floor((i / 8)));

            var field = document.createElement('div');
            field.style.top = (row * squareSize) + 'px';
            field.style.left = (col * squareSize) + 'px';
            field.style.width = squareSize + 'px';
            field.style.height = squareSize + 'px';
            field.className = 'square ' + (((i % 2 === 0 && row % 2 === 0) || (i % 2 == 1 && row % 2 == 1)) ? 'w' : 'b');

            boardElt.appendChild(field);
        }

        var curCol = 0,
            color;
        for (i = 0; i < fragments.length; i++) {
            var curChar = fragments.substr(i, 1);

            if (curChar.match(/[A-Z]/i)) {
                var boardPos = getPos(curCol);
                var piece = document.createElement('div');
                piece.style.top = (boardPos.row * squareSize) + 'px';
                piece.style.left = (boardPos.col * squareSize) + 'px';
                piece.style.width = squareSize + 'px';
                piece.style.height = squareSize + 'px';
                piece.className = 'piece';

                if (curChar.match(/[A-Z]/)) {
                    color = 'w';
                }
                if (curChar.match(/[a-z]/)) {
                    color = 'b';
                }

                piece.style.backgroundImage = 'url(images/highres/' + curChar.toLowerCase() + color + '.png)';

                boardElt.appendChild(piece);
                curCol++;
            }
            if (curChar.match(/[0-8]/)) {
                curCol += parseInt(curChar);
            }
        }
    };

})(this, this.document);