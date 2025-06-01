
// JavaScript to calculate total amount dynamically
function calculateTotal() {
    const studentPrice = 30; // Price per student
    const teacherPrice = 0; // Complimentary tickets for teachers

    const numStudents = parseInt(document.getElementById("numStudents").value) || 0;
    const numTeachers = parseInt(document.getElementById("numTeachers").value) || 0;

    const totalAmount = (numStudents * studentPrice) + (numTeachers * teacherPrice);
    document.getElementById("totalAmount").innerText = `$${totalAmount}`;
}

document.addEventListener('DOMContentLoaded', function() {

    //calculate initial total
    calculateTotal();

    // Add valiadtion for trip date
    document.getElementById('tripDate').addEventListener('change',function(){
        const selectedDate = new Date(this.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
        selectedDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
        // Check if the trip date is in the past
        if(selectedDate < today){
            alert("Please select a future date for the trip.");
            this.value = ''; // Clear the invalid date
        }
    });

    // Add Event listener for form submission
    document.getElementById('schoolBooking').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission'

        // Collect form data
        const form = document.querySelector('form');

        // Check if form is valid
        if(!form.checkValidity()){
            // If form is invalid, show validation errors
            form.reportValidity();
            return;
        }

        // Check minimum students reuirement
        const numStudents = parseInt(document.getElementById('numStudents').value) || 0;
        if(numStudents < 20){
            alert("You must book for at least 20 students to proceed with the school booking.");
            return;
        }

        if(numStudents > 100){
            alert("You cannot book for more than 100 students at a time.");
            return;
        }

        // check if terms are accepted
        const termsAccepted = document.getElementById('agreeTerms').checked;
        if(!termsAccepted){
            alert("You must accept the terms and conditions to proceed.");
            return;
        }

        
        // Collect form data
        const schoolName = document.getElementById('schoolName').value;
        const schoolEmail = document.getElementById('schoolEmail').value;
        const schoolPhone = document.getElementById('schoolPhone').value;
        const tripDate = document.getElementById('tripDate').value;
        const schoolAddress = document.getElementById('schoolAddress').value;
        const schoolCity = document.getElementById('schoolCity').value;
        const schoolZip = document.getElementById('schoolZip').value;
        
        const numTeachers = document.getElementById('numTeachers').value;
        const totalAmount = document.getElementById('totalAmount').innerText;

        // Format date for display
        const formattedTripDate = new Date(tripDate).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });    

        // Generate receipt content
        const receiptContent = `
            <div class="receipt-container" style="border: 1px solid #ccc; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
                <div class="text-center mb-4">
                    <h3 class="text-primary">WonderOasis ThemePark</h3>
                    <p class="text-muted mb-1">123 WonderOasis Lane, Adventure City</p>
                    <p class="text-muted mb-1">School Trip Booking #: WO-SCH-${Math.floor(100000 + Math.random() * 900000)}</p>
                    <p class="text-muted">Booking Date: ${new Date().toLocaleDateString()} | Time: ${new Date().toLocaleTimeString()}</p>
                    <hr class="my-3">
                </div>
                
                <h4 class="text-center mb-3">School Trip Booking Receipt</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="mb-3">School Information</h5>
                        <table class="table table-sm">
                            <tr>
                                <td><strong>School Name:</strong></td>
                                <td>${schoolName}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>${schoolEmail}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone:</strong></td>
                                <td>${schoolPhone}</td>
                            </tr>
                            <tr>
                                <td><strong>Address:</strong></td>
                                <td>${schoolAddress}, ${schoolCity}, ${schoolZip}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="col-md-6">
                        <h5 class="mb-3">Visit Details</h5>
                        <table class="table table-sm">
                            <tr>
                                <td><strong>Trip Date:</strong></td>
                                <td>${formattedTripDate}</td>
                            </tr>
                            <tr>
                                <td><strong>Group Size:</strong></td>
                                <td>${parseInt(numStudents) + parseInt(numTeachers)} people</td>
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
                            <td>Student Tickets</td>
                            <td class="text-center">${numStudents}</td>
                            <td class="text-end">$30.00</td>
                            <td class="text-end">$${numStudents * 30}.00</td>
                        </tr>
                        <tr>
                            <td>Teacher Tickets</td>
                            <td class="text-center">${numTeachers}</td>
                            <td class="text-end">$0.00 (Complimentary)</td>
                            <td class="text-end">$0.00</td>
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
                    <h5>School Trip Information</h5>
                    <ul class="small text-muted">
                        <li>Please arrive 30 minutes before your scheduled time to check in at the school groups entrance.</li>
                        <li>A staff member will meet your group and provide wristbands for all students and teachers.</li>
                        <li>We recommend one teacher for every 10 students for proper supervision.</li>
                        <li>Our educational tours begin at 10:00 AM and 1:00 PM daily.</li>
                        <li>Lunch facilities for school groups are available at our Education Center.</li>
                        <li>For any changes to your booking or special requirements, please contact our education team at education@wonderoasis.com</li>
                    </ul>
                </div>
                
                <div class="mt-4 pt-3 border-top">
                    <h5>Terms & Conditions</h5>
                    <ul class="small text-muted">
                        <li>This booking is non-refundable but may be rescheduled with at least 14 days notice.</li>
                        <li>Teachers are responsible for supervising their students throughout the visit.</li>
                        <li>WonderOasis ThemePark reserves the right to modify educational programs if necessary.</li>
                        <li>All park rules must be followed by students and teachers during the visit.</li>
                    </ul>
                </div>
                
                <div class="text-center mt-4">
                    <p class="mb-1"><strong>Thank you for choosing WonderOasis ThemePark for your school trip!</strong></p>
                    <p class="small text-muted mb-0">We look forward to providing an educational and fun experience for your students.</p>
                </div>
            </div>
        `;

        // Display receipt in a modal
        document.getElementById("receiptContent").innerHTML = receiptContent;
        new bootstrap.Modal(document.getElementById('receiptModal')).show();
    }
    );
 });