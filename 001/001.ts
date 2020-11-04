/**
 * Class calculator
 */
class Calculator {
    /**
     * To add more operations, only add new one here and implement the
     * operation into the parseOperation function
     */
    static operations = [
        'Plus',
        'Minus',
        'Times',
        'Divide',
    ];

    /**
     * Parse the data from the textarea
     * @param operation string
     * @param resultId string
     */
    public static doCalc(operation: string = '', resultId: string = 'result-001'): void {
        let data = []
        // Clean the result window
        this.paintResult(resultId, '-');
        try {
            data = JSON.parse(operation);
        } catch(err) {
            // operation is undefined or not a valid array
        }
        if(data.length === 3) {
            let operator = data[1];
            if(this.checkOperator(operator.toString())) {
                let result = this.recursiveCalc(data);
                this.paintResult(resultId, result.toString());
            } else {
                this.paintResult(resultId, 'Operation <b>"' + operator + '"</b> does not exists');
            }
        } else {
            this.paintResult(resultId, 'Array data is not valid');
        }
    }

    /**
     * @param complexOperation array
     */
    public static recursiveCalc(complexOperation: Array<any>): number {
        let result : number = NaN;
        if(complexOperation.length === 3) {
            let operand1 = complexOperation[0];
            if(Array.isArray(operand1)) {
                operand1 = this.recursiveCalc(operand1);
            }
            let operand2 = complexOperation[2];
            if(Array.isArray(operand2)) {
                operand2 = this.recursiveCalc(operand2);
            }
            let operation = complexOperation[1];
            result = this.parseOperation(operand1, operand2, operation);
        }
        return result;
    }

    /**
     *
     * @param operand1 number
     * @param operand2 number
     * @param operator string
     * @private
     */
    private static parseOperation(operand1: number, operand2: number, operator: string) : number {
        let result = 0;
        switch(operator) {
            case this.operations[0]: result = operand1 + operand2; break;
            case this.operations[1]: result = operand1 - operand2; break;
            case this.operations[2]: result = operand1 * operand2; break;
            case this.operations[3]:
                result = (operand2 !== 0) ? operand1 / operand2 : NaN;
                break;
        }
        return result;
    }

    /**
     * Function to check if operator exists
     * @param operator
     * @private
     */
    private static checkOperator(operator: string): boolean {
        let exists = false;
        Calculator.operations.forEach((op) => {
            if(op.toLowerCase() === operator.toLowerCase()) {
                exists = true;
            }
        });
        return exists;
    }

    /**
     * Paint the final result in the HTML
     * @param id string
     * @param text string
     */
    static paintResult(id: string, text: string): void {
        document.getElementById(id).innerHTML = text;
    }
}
