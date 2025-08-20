function calculateAttendance(event) 
{
    event.preventDefault();

    // Get values from fields
    const name = document.getElementById("studentName").value.trim();
    const month_year = String(document.getElementById("month").value.trim());
    const attended = parseInt(document.getElementById("attendedDays").value);
    
    const workingDays = calculateWorkingDays(month_year)  // --> Part 2
    // document.getElementById("totalDays").value  = workingDays
    
    // Calculate percentage
    const resultDiv = document.getElementById("result");
    if (attended > workingDays) {
        resultDiv.style.color = "red";
        resultDiv.textContent = "Error: Days attended cannot exceed total working days.";
        return;
    }

    const percentage = ((attended / workingDays) * 100).toFixed(2);

    // Show result - at the bottom of the form
    // resultDiv.style.color = "green";
    // resultDiv.textContent = `${name}'s attendance in ${month} is ${percentage}%`;

    // Get the form and table elements
    const tableBody = document.getElementById('resultContent');
    const form = document.getElementById('attendanceForm');

    // Create new row with 3 cells
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const monthCell = document.createElement('td');
    const attendanceCell = document.createElement('td');
    
    // Assign data to the cell 
    nameCell.textContent = name;
    monthCell.textContent = month_year;
    attendanceCell.textContent = percentage;

    // Append the new elements  to cell -> row -> tablebody
    row.appendChild(nameCell);
    row.appendChild(monthCell);
    row.appendChild(attendanceCell);
    tableBody.appendChild(row);
    
    // Clear the form
    form.reset();
}


function calculateWorkingDays(month_year)
{
    const year = month_year.split('-')[0];
    const month = month_year.split('-')[1];
    // var days = new Date(year, month, 0).getDate() --> total days in a month
    var weekdays = 0;
    // Loop through each day of the month, check if it’s not Saturday (6) or Sunday (0).
    let monthDate = new Date(year, month, 1);
    while (monthDate.getMonth() == month) {
        let day = monthDate.getDay(); // 0 = Sunday, 6 = Saturday
        if (day !== 0 && day !== 6) { // skip weekends
            weekdays++; 
        }
        monthDate.setDate(monthDate.getDate() + 1); // next day
    }
    return weekdays;
}