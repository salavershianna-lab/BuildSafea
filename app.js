/* =========================================
   LOGIN
========================================= */

function schoolHeadLogin() {
    window.location.href = "dashboard-head.html";
}

function teacherAdviserLogin() {
    window.location.href = "dashboard.html";
}


/* =========================================
   NAVIGATION
========================================= */

function Dashboard() {
    window.location.href = "dashboard-head.html";
}

function Classroom() {
    window.location.href = "dashboard-head.html#roomsSection";
}

function Reports() {
    window.location.href = "reports.html";
}

function logout() {
    window.location.href = "index.html";
}


/* =========================================
   TEACHER DASHBOARD
========================================= */

function searchDashboard() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const searchValue = input.value.toLowerCase().trim();

    const rooms = document.querySelectorAll(".room-card");

    rooms.forEach(function(room) {

        const roomText = room.innerText.toLowerCase();

        room.style.display =
            roomText.includes(searchValue) ? "block" : "none";

    });
}


function openInventory(room) {

    window.location.href =
        "inventory.html?room=" + room;

}


/* =========================================
   INVENTORY
========================================= */

function enableInventoryEdit() {

    const inputs =
        document.querySelectorAll(".inventory-table input");

    inputs.forEach(function(input) {
        input.disabled = false;
    });

    const updateButton =
        document.getElementById("updateInventoryButton");

    const saveButton =
        document.getElementById("saveInventoryButton");

    if (updateButton) {
        updateButton.style.display = "none";
    }

    if (saveButton) {
        saveButton.style.display = "inline-block";
    }

}


function saveInventory() {

    const inputs =
        document.querySelectorAll(".inventory-table input");

    inputs.forEach(function(input) {
        input.disabled = true;
    });

    const updateButton =
        document.getElementById("updateInventoryButton");

    const saveButton =
        document.getElementById("saveInventoryButton");

    if (updateButton) {
        updateButton.style.display = "inline-block";
    }

    if (saveButton) {
        saveButton.style.display = "none";
    }

    alert("Inventory updated successfully!");

}


/* =========================================
   ROOM PHOTO
========================================= */

function changeRoomPhoto(event) {

    const file = event.target.files[0];

    if (!file) return;

    const photo =
        document.getElementById("roomPhoto");

    if (photo) {
        photo.src = URL.createObjectURL(file);
    }

}


/* =========================================
   MAINTENANCE REPORT STORAGE
========================================= */

function getMaintenanceReports() {

    return JSON.parse(
        localStorage.getItem(
            "buildSafeMaintenanceReports"
        )
    ) || [];

}


function saveMaintenanceReports(reports) {

    localStorage.setItem(
        "buildSafeMaintenanceReports",
        JSON.stringify(reports)
    );

}


/* =========================================
   TEACHER REPORT FORM
========================================= */

function showDefectForm() {

    const form =
        document.getElementById("defectForm");

    if (form) {
        form.style.display = "block";
    }

}


function hideDefectForm() {

    const form =
        document.getElementById("defectForm");

    if (form) {
        form.style.display = "none";
    }

}


function submitDefect() {

    const item =
        document.getElementById("defectItem").value;

    const type =
        document.getElementById("defectType").value;

    const description =
        document.getElementById("defectDescription").value.trim();

    if (!item || !type || !description) {

        alert(
            "Please complete all required fields."
        );

        return;

    }


    const roomElement =
        document.querySelector(".room-title");

    let room = "Room 18";

    if (roomElement) {
        room = roomElement.innerText;
    }


    const reports =
        getMaintenanceReports();


    const newReport = {

        id: Date.now(),

        room: room,

        item: item,

        quantity: 1,

        concern: type,

        description: description,

        dateReported:
            new Date().toISOString().split("T")[0],

        verification: "Pending Verification",

        verifiedDate: "",

        status: "",

        statusHistory: []

    };


    reports.push(newReport);

    saveMaintenanceReports(reports);


    alert(
        "Defect report submitted successfully!"
    );


    document.getElementById("defectItem").value = "";
    document.getElementById("defectType").value = "";
    document.getElementById("defectDescription").value = "";

    const photo =
        document.getElementById("defectPhoto");

    if (photo) {
        photo.value = "";
    }


    hideDefectForm();

}


/* =========================================
   SCHOOL HEAD DASHBOARD
========================================= */

function searchHeadDashboard() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    const search =
        input.value.toLowerCase().trim();

    const rooms =
        document.querySelectorAll(".room-card");

    rooms.forEach(function(room) {

        const text =
            room.textContent.toLowerCase();

        room.style.display =
            text.includes(search) ? "" : "none";

    });

}


/* =========================================
   VERIFY REPORT
========================================= */

function verifyReport(reportId) {

    const reports =
        getMaintenanceReports();

    const report =
        reports.find(function(item) {

            return String(item.id) ===
                String(reportId);

        });


    if (!report) {

        alert("Report not found.");

        return;

    }


    if (report.verification === "Verified") {

        alert(
            "This report is already verified."
        );

        return;

    }


    const confirmVerification =
        confirm(
            "Are you sure you want to verify this maintenance report?"
        );


    if (!confirmVerification) return;


    const today =
        new Date().toISOString().split("T")[0];


    report.verification = "Verified";

    report.verifiedDate = today;


    /*
       After verification,
       repair starts at Scheduled.
    */

    if (!report.status) {

        report.status = "Scheduled";

        report.statusHistory = [

            {
                status: "Scheduled",
                date: today
            }

        ];

    }


    saveMaintenanceReports(reports);


    alert(
        "Maintenance report verified successfully."
    );


    loadHeadReports();

    updateReportRoomBadges();

}


/* =========================================
   CHANGE REPAIR STATUS
========================================= */

function changeRepairStatus(reportId, newStatus) {

    const reports =
        getMaintenanceReports();

    const report =
        reports.find(function(item) {

            return String(item.id) ===
                String(reportId);

        });


    if (!report) {

        alert("Report not found.");

        return;

    }


    /*
       Cannot change status
       before verification.
    */

    if (report.verification !== "Verified") {

        alert(
            "Please verify the report first."
        );

        loadHeadReports();

        return;

    }


    if (!newStatus) return;


    if (report.status === newStatus) return;


    const today =
        new Date().toISOString().split("T")[0];


    report.status = newStatus;


    if (!report.statusHistory) {

        report.statusHistory = [];

    }


    report.statusHistory.push({

        status: newStatus,

        date: today

    });


    /*
       Exact completion date.
    */

    if (newStatus === "Completed") {

        report.actualCompletion = today;

    }


    saveMaintenanceReports(reports);


    loadHeadReports();

}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "—";
    }


    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}


/* =========================================
   MAINTENANCE TIMELINE
========================================= */

function createMaintenanceTimeline(report) {

    let timeline = "";


    /*
       Reported date
    */

    if (report.dateReported) {

        timeline += `

            <div class="timeline-item">

                <div class="timeline-dot"></div>

                <div class="timeline-content">

                    <strong>Reported</strong>

                    <span>
                        ${formatDate(report.dateReported)}
                    </span>

                </div>

            </div>

        `;

    }


    /*
       Verified date
    */

    if (report.verification === "Verified") {

        timeline += `

            <div class="timeline-item">

                <div class="timeline-dot"></div>

                <div class="timeline-content">

                    <strong>Verified</strong>

                    <span>
                        ${formatDate(report.verifiedDate)}
                    </span>

                </div>

            </div>

        `;

    }


    /*
       Repair status history
    */

    const history =
        report.statusHistory || [];


    history.forEach(function(item) {

        timeline += `

            <div class="timeline-item">

                <div class="timeline-dot"></div>

                <div class="timeline-content">

                    <strong>
                        ${item.status}
                    </strong>

                    <span>
                        ${formatDate(item.date)}
                    </span>

                </div>

            </div>

        `;

    });


    return timeline;

}


/* =========================================
   LOAD SCHOOL HEAD REPORTS
========================================= */

function loadHeadReports() {

    const container =
        document.getElementById(
            "headMaintenanceReports"
        );


    if (!container) return;


    const reports =
        getMaintenanceReports();


    if (reports.length === 0) {

        container.innerHTML = `

            <div class="maintenance-report">

                <p>
                    No maintenance reports yet.
                </p>

            </div>

        `;

        updateHeadSummary([]);

        return;

    }


    container.innerHTML = "";


    reports.forEach(function(report) {

        const isVerified =
            report.verification === "Verified";


        const box =
            document.createElement("div");


        box.className =
            "maintenance-report";


        box.innerHTML = `

            <h3>
                ${report.room}
            </h3>


            <div class="report-information">

                <p>
                    <strong>Item:</strong>
                    ${report.item}
                </p>

                <p>
                    <strong>Quantity Affected:</strong>
                    ${report.quantity}
                </p>

                <p>
                    <strong>Concern:</strong>
                    ${report.concern}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${report.description || "—"}
                </p>

                <p>
                    <strong>Date Reported:</strong>
                    ${formatDate(report.dateReported)}
                </p>

            </div>


            <div class="verification-section">

                <h4>
                    Verification
                </h4>


                <p class="${
                    isVerified
                        ? "verified"
                        : "pending"
                }">

                    ${
                        isVerified
                            ? "✓ Verified"
                            : "⚠ Pending Verification"
                    }

                </p>


                ${
                    isVerified

                        ? `

                            <p>
                                Verified on:
                                <strong>
                                    ${formatDate(
                                        report.verifiedDate
                                    )}
                                </strong>
                            </p>

                        `

                        : `

                            <button
                                class="verify-button"
                                onclick="verifyReport('${report.id}')"
                            >
                                VERIFY REPORT
                            </button>

                        `
                }

            </div>


            <div class="repair-section">

                <h4>
                    Repair Management
                </h4>


                ${
                    isVerified

                        ? `

                            <label>
                                Repair Status
                            </label>

                            <select
                                onchange="
                                    changeRepairStatus(
                                        '${report.id}',
                                        this.value
                                    )
                                "
                            >

                                <option
                                    value="Scheduled"
                                    ${
                                        report.status === "Scheduled"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Scheduled
                                </option>

                                <option
                                    value="In Progress"
                                    ${
                                        report.status === "In Progress"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    In Progress
                                </option>

                                <option
                                    value="Completed"
                                    ${
                                        report.status === "Completed"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Completed
                                </option>

                            </select>


                            <div class="maintenance-timeline">

                                <h4>
                                    Maintenance Timeline
                                </h4>

                                ${createMaintenanceTimeline(
                                    report
                                )}

                            </div>

                        `

                        : `

                            <div class="locked-management">

                                <p>
                                    🔒 Repair management is locked.
                                </p>

                                <small>
                                    Verify the report first
                                    before changing the repair status.
                                </small>

                            </div>

                        `
                }

            </div>

        `;


        container.appendChild(box);

    });


    updateHeadSummary(reports);

}


/* =========================================
   SCHOOL HEAD SUMMARY
========================================= */

function updateHeadSummary(reports) {

    const totalReports =
        document.getElementById("totalReports");

    const pendingReports =
        document.getElementById("pendingReports");

    const ongoingRepairs =
        document.getElementById("ongoingRepairs");


    if (totalReports) {

        totalReports.textContent =
            reports.length;

    }


    if (pendingReports) {

        pendingReports.textContent =

            reports.filter(function(report) {

                return report.verification !==
                    "Verified";

            }).length;

    }


    if (ongoingRepairs) {

        ongoingRepairs.textContent =

            reports.filter(function(report) {

                return report.status ===
                    "In Progress";

            }).length;

    }

}


/* =========================================
   REPORT PAGE — ROOM BUTTONS
========================================= */

function openReport(room) {

    const reports =
        getMaintenanceReports();


    const roomReports =
        reports.filter(function(report) {

            return String(report.room)
                .includes(String(room));

        });


    if (roomReports.length === 0) {

        alert(
            "No maintenance report for Room " +
            room +
            " yet."
        );

        return;

    }


    /*
       For now, show the reports
       for the selected room.
    */

    const report =
        roomReports[roomReports.length - 1];


    alert(

        "Maintenance Report\n\n" +

        "Room: " + report.room + "\n" +

        "Item: " + report.item + "\n" +

        "Concern: " + report.concern + "\n" +

        "Description: " +
        (report.description || "—") +
        "\n\n" +

        "Verification: " +
        report.verification +
        "\n" +

        "Repair Status: " +
        (report.status || "Pending Verification")

    );

}


/* =========================================
   NEW UPDATE BADGES
========================================= */

function updateReportRoomBadges() {

    const reports =
        getMaintenanceReports();


    let newUpdates = 0;


    ["18", "19", "20"].forEach(function(room) {

        const badge =
            document.getElementById(
                "newUpdate" + room
            );


        if (!badge) return;


        const hasNewReport =
            reports.some(function(report) {

                return String(report.room)
                    .includes(room) &&
                    report.verification !== "Verified";

            });


        if (hasNewReport) {

            badge.style.display = "inline-block";

            newUpdates++;

        } else {

            badge.style.display = "none";

        }

    });


    const totalBadge =
        document.getElementById(
            "newReportBadge"
        );


    if (totalBadge) {

        totalBadge.textContent =
            newUpdates + " New Updates";

    }

}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadHeadReports();

        updateReportRoomBadges();

    }
);