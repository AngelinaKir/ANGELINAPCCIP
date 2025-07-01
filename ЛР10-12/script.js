function calculateP(a, x, c, k) {
    try {
        let P;
        
        if (a < 0 && c !== 0) {
            P = Math.pow(a, 2) + k * x + c;
        } else if (a > 0 && c === 0) {
            P = -a;
        } else {
            P = x - c;
        }
        
        // Проверка на возможные ошибки
        if (isNaN(P)) {
            throw new Error("Результат не является числом");
        }
        if (!isFinite(P)) {
            throw new Error("Результат бесконечен");
        }
        
        return P;
    } catch (error) {
        alert("Ошибка при вычислении: " + error.message);
        return null;
    }
}