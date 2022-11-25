$(document).ready(function() {
    let x = null;
    let r = null;

    $(".x").click(function (event) {
        event.preventDefault();
        $(".x_real").val($(this).val());
        $(".x").css("background-color", "");
        $(this).css("background-color", "gray");
        x = $(this).val();
    });

    $(".r").click(function (event) {
        event.preventDefault();
        $(".r_real").val($(this).val());
        $(".r").css("background-color", "");
        $(this).css("background-color", "gray");
        r = $(this).val();
    });

    let canvas = document.getElementById("plot");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let r = canvas.width / 3;
        let zero = canvas.width / 2;

        ctx.beginPath();
        ctx.arc(zero, zero, r, 0, -Math.PI / 2, true);
        ctx.lineTo(zero, zero);
        ctx.fillStyle = "#0000ff";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(zero, zero);
        ctx.lineTo(zero - r / 2, zero);
        ctx.lineTo(zero, zero - r);
        ctx.lineTo(zero, zero);
        ctx.fillStyle = "#0000ff";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(zero, zero);
        ctx.lineTo(zero, zero + r / 2);
        ctx.lineTo(zero + r, zero + r / 2);
        ctx.lineTo(zero + r, zero);
        ctx.lineTo(zero, zero);
        ctx.fillStyle = "#0000ff";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(zero, 10);
        ctx.lineTo(zero, canvas.height - 10);
        ctx.moveTo(zero, 10);
        ctx.lineTo(zero - 6, 20);
        ctx.moveTo(zero, 10);
        ctx.lineTo(zero + 6, 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvas.width - 10, zero);
        ctx.lineTo(10, zero);
        ctx.moveTo(canvas.width - 10, zero);
        ctx.lineTo(canvas.width - 20, zero - 6);
        ctx.moveTo(canvas.width - 10, zero);
        ctx.lineTo(canvas.width - 20, zero + 6);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(zero - 4, zero - r);
        ctx.lineTo(zero + 4, zero - r);
        ctx.moveTo(zero - 4, zero - r / 2);
        ctx.lineTo(zero + 4, zero - r / 2);
        ctx.moveTo(zero - 4, zero + r / 2);
        ctx.lineTo(zero + 4, zero + r / 2);
        ctx.moveTo(zero - 4, zero + r);
        ctx.lineTo(zero + 4, zero + r);

        ctx.moveTo(zero - r, zero - 4);
        ctx.lineTo(zero - r, zero + 4);
        ctx.moveTo(zero - r / 2, zero - 4);
        ctx.lineTo(zero - r / 2, zero + 4);
        ctx.moveTo(zero + r / 2, zero - 4);
        ctx.lineTo(zero + r / 2, zero + 4);
        ctx.moveTo(zero + r, zero - 4);
        ctx.lineTo(zero + r, zero + 4);
        ctx.stroke();
    }

    draw();
    drawPoints();

//canvas onclick
    canvas.onclick = function (event) {
        let r = $('.r_real').val();
        if (r === undefined || r === '') {
            alert("R is not selected");
            return;
        }

        let xC = event.offsetX;
        let yC = event.offsetY;
        let rC = canvas.width / 3;
        let zero = canvas.width / 2;

        if (xC > zero - rC && xC < zero + rC && yC > zero - rC && yC < zero + rC) { //?
            let xValue = ((xC - zero) / rC) * r
            let yValue = ((zero - yC) / rC) * r
            $(".x_real").val(Math.round(xValue));
            $(".y").val(Math.round(yValue * 100) / 100);
            $(".submit").click();
        }
    }

    function drawPoints() {
        let table = document.getElementById("result");
        let rows = table.rows;
        let rC = canvas.width / 3;
        let zero = canvas.width / 2;

        for (let i = 1; i < rows.length; i++) {
            //parse numbers
            let x = parseFloat(rows[i].cells[0].innerText)
            let yy = parseFloat(rows[i].cells[1].innerText)
            let r = parseFloat(rows[i].cells[2].innerText);
            let result = rows[i].cells[3].innerText;

            let xC = (x / r) * rC + zero;
            let yC = zero - (yy / r) * rC;
            ctx.beginPath();
            ctx.arc(xC, yC, 3, 0, 2 * Math.PI);
            if (result.includes("TRUE")) {
                ctx.fillStyle = "#00ff00";
            } else {
                ctx.fillStyle = "#ff0000";
            }
            ctx.fill();
            ctx.stroke();
        }
    }
});