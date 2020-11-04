/**
 * Class calculator
 */
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    /**
     * Parse the data from the textarea
     * @param operation string
     * @param resultId string
     */
    Calculator.doCalc = function (operation, resultId) {
        if (operation === void 0) { operation = ''; }
        if (resultId === void 0) { resultId = 'result-001'; }
        var data = [];
        // Clean the result window
        this.paintResult(resultId, '-');
        try {
            data = JSON.parse(operation);
        }
        catch (err) {
            // operation is undefined or not a valid array
        }
        if (data.length === 3) {
            var operator = data[1];
            if (this.checkOperator(operator.toString())) {
                var result = this.recursiveCalc(data);
                this.paintResult(resultId, result.toString());
            }
            else {
                this.paintResult(resultId, 'Operation <b>"' + operator + '"</b> does not exists');
            }
        }
        else {
            this.paintResult(resultId, 'Array data is not valid');
        }
    };
    /**
     * @param complexOperation array
     */
    Calculator.recursiveCalc = function (complexOperation) {
        var result = NaN;
        if (complexOperation.length === 3) {
            var operand1 = complexOperation[0];
            if (Array.isArray(operand1)) {
                operand1 = this.recursiveCalc(operand1);
            }
            var operand2 = complexOperation[2];
            if (Array.isArray(operand2)) {
                operand2 = this.recursiveCalc(operand2);
            }
            var operation = complexOperation[1];
            result = this.parseOperation(operand1, operand2, operation);
        }
        return result;
    };
    /**
     *
     * @param operand1 number
     * @param operand2 number
     * @param operator string
     * @private
     */
    Calculator.parseOperation = function (operand1, operand2, operator) {
        var result = 0;
        switch (operator) {
            case this.operations[0]:
                result = operand1 + operand2;
                break;
            case this.operations[1]:
                result = operand1 - operand2;
                break;
            case this.operations[2]:
                result = operand1 * operand2;
                break;
            case this.operations[3]:
                result = (operand2 !== 0) ? operand1 / operand2 : NaN;
                break;
        }
        return result;
    };
    /**
     * Function to check if operator exists
     * @param operator
     * @private
     */
    Calculator.checkOperator = function (operator) {
        var exists = false;
        Calculator.operations.forEach(function (op) {
            if (op.toLowerCase() === operator.toLowerCase()) {
                exists = true;
            }
        });
        return exists;
    };
    /**
     * Paint the final result in the HTML
     * @param id string
     * @param text string
     */
    Calculator.paintResult = function (id, text) {
        document.getElementById(id).innerHTML = text;
    };
    /**
     * To add more operations, only add new one here and implement the
     * operation into the parseOperation function
     */
    Calculator.operations = [
        'Plus',
        'Minus',
        'Times',
        'Divide',
    ];
    return Calculator;
}());
//# sourceMappingURL=001.js.map