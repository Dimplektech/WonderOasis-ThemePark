// JavaScript to calculate total amount dynamically
 // JavaScript to calculate total amount dynamically
function calculateTotal() {
    const adultPrice = 50; // Price per adult
    const childPrice = 30; // Price per child
    const seniorPrice = 40; // Price per senior

    const numAdults = parseInt(document.getElementById("numAdults").value) || 0;
    const numChildren = parseInt(document.getElementById("numChildren").value) || 0;
    const numSeniors = parseInt(document.getElementById("numSeniors").value) || 0;

    const totalAmount = (numAdults * adultPrice) + (numChildren * childPrice) + (numSeniors * seniorPrice);
    document.getElementById("totalAmount").innerText = `£${totalAmount}`;
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Add event listener for date validation
    document.getElementById('visitDate').addEventListener('change',function(){
        const visitDate =new Date(this.value);
        const today =new Date();
        // Check if the visit date is in the past
        if(visitDate < today){
            alert("The visit date cannot be in the past. Please select valid date.");
            this.value =''; //Reset the input value
        }
    })
    // Add event listener for form submission
    document.getElementById('dayTickBookBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        
             
        // Collect form data
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const numAdults = document.getElementById('numAdults').value;
        const numChildren = document.getElementById('numChildren').value;
        const numSeniors = document.getElementById('numSeniors').value;
        const totalAmount = document.getElementById('totalAmount').innerText;
        const visitDate = document.getElementById('visitDate').value;

        // Check if the form is valid        
        // Get the form element
        const form = document.querySelector('form');

        //check if form id valid
        if(!form.checkValidity()){
            // If form is invalid, show validation errors
            form.reportValidity();
            return;

        }

         // Format date for display
        const formattedTripDate = new Date(visitDate).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
  

        // Generate receipt content with improved design
        const receiptContent = `
            <div class="receipt-container" style="border: 1px solid #ccc; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
                <div class="text-center mb-4">
                    <h3 class="text-primary">WonderOasis ThemePark</h3>
                    <p class="text-muted mb-1">123 WonderOasis Lane, Adventure City</p>
                    <p class="text-muted mb-1">Receipt #: WO-${Math.floor(100000 + Math.random() * 900000)}</p>
                    <p class="text-muted">Date: ${new Date().toLocaleDateString()} | Time: ${new Date().toLocaleTimeString()}</p>
                    <hr class="my-3">
                </div>
                
                <h4 class="text-center mb-3">Group Booking Receipt</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="mb-3">Group Leader Details</h5>
                        <table class="table table-sm">
                            <tr>
                                <td><strong>Name:</strong></td>
                                <td>${firstName} ${lastName}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>${email}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone:</strong></td>
                                <td>${phone}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="col-md-6">
                        <h5 class="mb-3">Visit Details</h5>
                        <table class="table table-sm">
                            <tr>
                                <td><strong>Visit Date:</strong></td>
                                <td>${formattedTripDate}</td>
                            </tr>
                            <tr>
                                <td><strong>Number of People:</strong></td>
                                <td>${parseInt(numAdults) + parseInt(numChildren) + parseInt(numSeniors)} </td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <h5 class="mb-3 mt-4">Ticket Details</h5>
                <table class="table">
                    <thead class="table-light">
                        <tr>
                            <th>Ticket Type</th>
                            <th class="text-center">Quantity</th>
                            <th class="text-end">Price (per ticket)</th>
                            <th class="text-end">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Adult Tickets</td>
                            <td class="text-center">${numAdults}</td>
                            <td class="text-end">£40.00</td>
                            <td class="text-end">£${numAdults * 40}.00</td>
                        </tr>
                        <tr>
                            <td>Child Tickets</td>
                            <td class="text-center">${numChildren}</td>
                            <td class="text-end">£30.00</td>
                            <td class="text-end">£${numChildren * 30}.00</td>
                        </tr>
                        <tr>
                            <td>Senior Tickets</td>
                            <td class="text-center">${numSeniors}</td>
                            <td class="text-end">£35.00</td>
                            <td class="text-end">£${numSeniors * 35}.00</td>
                        </tr>
                    </tbody>
                    <tfoot class="table-light">
                        <tr>
                            <th colspan="3" class="text-end">Total:</th>
                            <th class="text-end">${totalAmount}</th>
                        </tr>
                    </tfoot>
                </table>
                
                <div class="mt-4 pt-3 border-top">
                    <h5>Important Information</h5>
                    <ul class="small text-muted">
                        <li>Please present this receipt at the entrance on the day of your visit.</li>
                        <li>Tickets are non-refundable and non-transferable.</li>
                        <li>For any changes or inquiries, please contact us at info@wonderoasis.com or call (123) 456-7890.</li>
                    </ul>
                </div>
                
                <div class="text-center mt-4">
                    <p class="mb-1"><strong>Thank you for choosing WonderOasis ThemePark!</strong></p>
                    <p class="small text-muted mb-0">We look forward to creating magical memories with your group.</p>
                </div>
            </div>
        `;

        // Display receipt in modal
        document.getElementById('receiptContent').innerHTML = receiptContent;
        new bootstrap.Modal(document.getElementById('dayTicketsReceiptModal')).show();
    });

    // Print receipt functionality
    document.getElementById('printReceipt').addEventListener('click', function() {
        window.print();
    });

    // Add change event listeners for quantity inputs
    document.getElementById('numAdults').addEventListener('change', calculateTotal);
    document.getElementById('numChildren').addEventListener('change', calculateTotal);
    document.getElementById('numSeniors').addEventListener('change', calculateTotal);
});