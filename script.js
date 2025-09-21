const display = document.getElementById("display");
const normalButtons = document.getElementById("normal-buttons");
const sciButtons = document.getElementById("sci-buttons");
const modeBtn = document.getElementById("mode-btn");
const historyBtn = document.getElementById("history-btn");
const historyDiv = document.getElementById("history");

let historyList = [];
let sciVisible = false;

// ---------------- Toggle Scientific Mode ----------------
modeBtn.addEventListener("click", () => {
    sciVisible = !sciVisible;
    sciButtons.classList.toggle("hidden");
});

// ---------------- Factorial ----------------
function factorial(n) {
    n = Math.floor(n);
    if (n < 0) return NaN;
    if (n === 0) return 1;
    let res = 1;
    for (let i = 1; i <= n; i++) res *= i;
    return res;
}

// ---------------- Safe Evaluate ----------------
function safeEval(expr) {
    try {
        expr = expr.replace(/π/g, "Math.PI")
                   .replace(/e/g, "Math.E")
                   .replace(/√/g, "Math.sqrt")
                   .replace(/ln/g, "Math.log")
                   .replace(/log/g, "Math.log10")
                   .replace(/\^2/g, "**2")
                   .replace(/\^3/g, "**3")
                   .replace(/\^/g, "**")
                   .replace(/!/g, "factorial")
                   .replace(/sin/g, "(x=>Math.sin(x*Math.PI/180))")
                   .replace(/cos/g, "(x=>Math.cos(x*Math.PI/180))")
                   .replace(/tan/g, "(x=>Math.tan(x*Math.PI/180))");

        return Function("factorial", "return " + expr)(factorial);
    } catch {
        return "Error";
    }
}

// ---------------- Button Click ----------------
document.querySelectorAll(".buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
        const val = btn.textContent;

        if (val === "AC") display.value = "";
        else if (val === "←") display.value = display.value.slice(0, -1);
        else if (val === "=") {
            const result = safeEval(display.value);
            historyList.push(`${display.value} = ${result}`);
            display.value = result;
            historyDiv.innerHTML = historyList.slice(-20).reverse().join("<br>");
        }
        else if (["sin","cos","tan","ln","log","√","!"].includes(val)) {
            if(val === "√") display.value += "√(";
            else if(val === "!") display.value += "!";
            else display.value += val + "(";
        }
        else display.value += val;
    });
});

// ---------------- Toggle History ----------------
historyBtn.addEventListener("click", () => {
    historyDiv.classList.toggle("hidden");
});
