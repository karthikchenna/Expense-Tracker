var income_btn = document.getElementById('income_btn');

income_btn.addEventListener('click', ()=>{
    var amount = parseInt(document.getElementById('amount').value) || 0;
    var income_val = parseInt(document.getElementById('income_val').innerText) || 0;
    var balance = parseInt(document.getElementById('balance').innerText) || 0;
    
    var totalIncome = income_val + amount;
    var totalBalance = balance + amount;
    
    document.getElementById('income_val').innerText = totalIncome;
    document.getElementById('balance').innerText = totalBalance;
    
    if(validate() == true){
        balance_color();
        addHistoryEntry('income');
        clearInputField();
    }    
});


var spent_btn = document.getElementById('spent_btn');
spent_btn.addEventListener('click', ()=>{
    var amount = parseInt(document.getElementById('amount').value) || 0;
    var expense_val = parseInt(document.getElementById('expense_val').innerText) || 0;
    var balance = parseInt(document.getElementById('balance').innerText) || 0;

    var totalExpense = expense_val - amount;
    var totalBalance = balance - amount;

    document.getElementById('expense_val').innerText = totalExpense;
    document.getElementById('balance').innerText = totalBalance;   
    
    if(validate() == true){
        balance_color();
        addHistoryEntry('expense');
        clearInputField();
    }    
});


function validate(){
    var amount = parseInt(document.getElementById('amount').value) || 0;
    var purpose = document.getElementById('purpose').value.trim();
    if (!purpose || amount <= 0) {
        alert('Please enter a valid purpose and amount.');
        return false; 
    }
    return true;
}


function balance_color(){
    var balance = document.getElementById('balance');
    var balance_amount = document.getElementById('balance').innerText;
    var balance_symbol = document.getElementById('balance_symbol');

    if(balance_amount <= 0) {
        balance.style.color = "#ef4444";
        balance_symbol.style.color = "#ef4444";
    } else {
        balance.style.color = "#22c55e";
        balance_symbol.style.color = "#22c55e";
    }
}

function clearInputField(){
    document.getElementById('purpose').value = '';
    document.getElementById('amount').value = '';
}

function addHistoryEntry(type) {

    var history_list = document.querySelector('.history_list');
    var purpose = document.getElementById('purpose').value.trim();
    var amount = parseInt(document.getElementById('amount').value) || 0;


    // Create a new history entry
    var historyEntry = document.createElement('div');
    historyEntry.classList.add('history_details');

    // Add purpose
    var purposeElement = document.createElement('p');
    purposeElement.classList.add('history_purpose');
    purposeElement.innerText = purpose;
    historyEntry.appendChild(purposeElement);

    // Add amount with appropriate symbol
    var amountElement = document.createElement('p');
    if(type === 'income') {
        amountElement.innerHTML = `<span class="symbol">+</span>` + amount;
        purposeElement.style.color = "#22c55e";
        amountElement.style.color = "#22c55e";
    } else if(type === 'expense') {
        amountElement.innerHTML = `<span class="symbol">-</span>` + amount;
        purposeElement.style.color = "#ef4444";
        amountElement.style.color = "#ef4444";
    }

    historyEntry.appendChild(amountElement);

    // Append the new entry to the history list
    history_list.appendChild(historyEntry);

    // Remove the "No Transactions..." message if it exists
    var noTransactionsMessage = history_list.querySelector('p');
    if (noTransactionsMessage && noTransactionsMessage.innerText === 'No Transactions...') {
        history_list.removeChild(noTransactionsMessage);
    }
}
