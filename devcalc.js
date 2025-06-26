document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        }
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        themeSwitch.checked = true;
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and content
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Conversion tab functionality
    const convertBtn = document.getElementById('convert-btn');
    convertBtn.addEventListener('click', performConversion);

    function performConversion() {
        const type = document.getElementById('conversion-type').value;
        const input = document.getElementById('input-value').value.trim();
        const resultDiv = document.getElementById('conversion-result');
        
        if (!input) {
            resultDiv.textContent = 'Please enter a value';
            return;
        }

        try {
            let result;
            switch(type) {
                case 'binary':
                    if (/^[01]+$/.test(input)) {
                        result = `Decimal: ${parseInt(input, 2)}`;
                    } else if (/^\d+$/.test(input)) {
                        result = `Binary: ${Number(input).toString(2)}`;
                    } else {
                        throw new Error('Invalid binary or decimal number');
                    }
                    break;
                case 'hex':
                    if (/^[0-9a-fA-F]+$/.test(input)) {
                        result = `Decimal: ${parseInt(input, 16)}`;
                    } else if (/^\d+$/.test(input)) {
                        result = `Hex: 0x${Number(input).toString(16).toUpperCase()}`;
                    } else {
                        throw new Error('Invalid hex or decimal number');
                    }
                    break;
                case 'octal':
                    if (/^[0-7]+$/.test(input)) {
                        result = `Decimal: ${parseInt(input, 8)}`;
                    } else if (/^\d+$/.test(input)) {
                        result = `Octal: 0${Number(input).toString(8)}`;
                    } else {
                        throw new Error('Invalid octal or decimal number');
                    }
                    break;
                case 'char':
                    if (input.length === 1) {
                        result = `ASCII: ${input.charCodeAt(0)}`;
                    } else if (/^\d+$/.test(input)) {
                        const charCode = parseInt(input);
                        if (charCode >= 0 && charCode <= 1114111) {
                            result = `Character: ${String.fromCharCode(charCode)}`;
                        } else {
                            throw new Error('ASCII code must be between 0 and 1114111');
                        }
                    } else {
                        throw new Error('Enter a single character or ASCII code');
                    }
                    break;
                default:
                    throw new Error('Invalid conversion type');
            }
            resultDiv.textContent = result;
        } catch (error) {
            resultDiv.textContent = `Error: ${error.message}`;
        }
    }

    // Bitwise operations functionality
    const bitwiseBtn = document.getElementById('bitwise-btn');
    bitwiseBtn.addEventListener('click', performBitwiseOperation);

    function performBitwiseOperation() {
        const operation = document.getElementById('bitwise-operation').value;
        const input1 = document.getElementById('bitwise-input1').value.trim();
        const input2 = document.getElementById('bitwise-input2').value.trim();
        const binaryRepDiv = document.getElementById('binary-representation');
        const resultDiv = document.getElementById('bitwise-result');
        
        if (!input1) {
            resultDiv.textContent = 'Please enter at least one number';
            return;
        }

        try {
            const num1 = parseInt(input1);
            if (isNaN(num1)) throw new Error('Invalid number input');

            let num2 = 0;
            if (input2 && operation !== 'not') {
                num2 = parseInt(input2);
                if (isNaN(num2)) throw new Error('Invalid second number');
            }

            let result;
            let binaryStr;
            
            switch(operation) {
                case 'and':
                    result = num1 & num2;
                    binaryStr = `${num1.toString(2)} & ${num2.toString(2)}`;
                    break;
                case 'or':
                    result = num1 | num2;
                    binaryStr = `${num1.toString(2)} | ${num2.toString(2)}`;
                    break;
                case 'xor':
                    result = num1 ^ num2;
                    binaryStr = `${num1.toString(2)} ^ ${num2.toString(2)}`;
                    break;
                case 'not':
                    result = ~num1;
                    binaryStr = `~${num1.toString(2)}`;
                    break;
                case 'leftshift':
                    result = num1 << num2;
                    binaryStr = `${num1.toString(2)} << ${num2}`;
                    break;
                case 'rightshift':
                    result = num1 >> num2;
                    binaryStr = `${num1.toString(2)} >> ${num2}`;
                    break;
                default:
                    throw new Error('Invalid operation');
            }

            binaryRepDiv.textContent = binaryStr;
            resultDiv.textContent = `Decimal: ${result}\nHex: 0x${result.toString(16).toUpperCase()}\nBinary: ${result.toString(2)}`;
        } catch (error) {
            resultDiv.textContent = `Error: ${error.message}`;
        }
    }

    // String operations functionality
    const stringBtn = document.getElementById('string-btn');
    stringBtn.addEventListener('click', performStringOperation);

    function performStringOperation() {
        const operation = document.getElementById('string-operation').value;
        const input = document.getElementById('string-input').value;
        const resultDiv = document.getElementById('string-result');
        
        if (!input) {
            resultDiv.textContent = 'Please enter some text';
            return;
        }

        try {
            let result;
            switch(operation) {
                case 'length':
                    result = `Character count: ${input.length}`;
                    break;
                case 'reverse':
                    result = input.split('').reverse().join('');
                    break;
                case 'upper':
                    result = input.toUpperCase();
                    break;
                case 'lower':
                    result = input.toLowerCase();
                    break;
                case 'trim':
                    result = input.trim();
                    break;
                default:
                    throw new Error('Invalid operation');
            }
            resultDiv.textContent = result;
        } catch (error) {
            resultDiv.textContent = `Error: ${error.message}`;
        }
    }

    // Array operations functionality
    const arrayBtn = document.getElementById('array-btn');
    arrayBtn.addEventListener('click', performArrayOperation);

    function performArrayOperation() {
        const operation = document.getElementById('array-operation').value;
        const input = document.getElementById('array-input').value.trim();
        const separator = document.getElementById('array-separator').value.trim() || ',';
        const resultDiv = document.getElementById('array-result');
        
        if (!input) {
            resultDiv.textContent = 'Please enter array values';
            return;
        }

        try {
            const array = input.split(',').map(item => item.trim());
            let result;
            
            switch(operation) {
                case 'join':
                    result = array.join(separator);
                    break;
                case 'reverse':
                    result = JSON.stringify(array.reverse());
                    break;
                case 'sum':
                    const sum = array.reduce((acc, item) => {
                        const num = parseFloat(item);
                        if (isNaN(num)) throw new Error('All items must be numbers');
                        return acc + num;
                    }, 0);
                    result = `Sum: ${sum}`;
                    break;
                case 'unique':
                    const uniqueArray = [...new Set(array)];
                    result = JSON.stringify(uniqueArray);
                    break;
                default:
                    throw new Error('Invalid operation');
            }
            resultDiv.textContent = result;
        } catch (error) {
            resultDiv.textContent = `Error: ${error.message}`;
        }
    }

    // Add Enter key functionality for inputs
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const activeTab = document.querySelector('.tab-content.active').id;
                switch(activeTab) {
                    case 'conversions':
                        performConversion();
                        break;
                    case 'bitwise':
                        performBitwiseOperation();
                        break;
                    case 'strings':
                        performStringOperation();
                        break;
                    case 'arrays':
                        performArrayOperation();
                        break;
                }
            }
        });
    });
});
