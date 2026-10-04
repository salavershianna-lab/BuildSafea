/* =========================================================
   BUILDSAFE DIHS - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   LOGIN
========================================================= */

function schoolHeadLogin() {
    window.location.href = "dashboard-head.html";
}

function teacherAdviserLogin() {
    window.location.href = "dashboard.html";
}


/* =========================================================
   NAVIGATION
========================================================= */

function Dashboard() {
    const currentPage = window.location.pathname;

    if (currentPage.includes("dashboard-head")) {
        window.location.href = "dashboard-head.html";
    } else {
        window.location.href = "dashboard.html";
    }
}

function Classroom() {
    window.location.href = "dashboard.html";
}

function Reports() {
    window.location.href = "reports.html";
}

function openReport(room) {
    window.location.href =
        "reports-inside.html?room=" + room;
}

function logout() {
    window.location.href = "index.html";
}


/* =========================================================
   TEACHER DASHBOARD SEARCH
========================================================= */

function searchDashboard() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    const search =
        input.value.toLowerCase().trim();

    const rooms =
        document.querySelectorAll(".room-card");

    rooms.forEach(function (room) {

        const text =
            room.innerText.toLowerCase();

        room.style.display =
            text.includes(search)
                ? ""
                : "none";
    });
}


/* =========================================================
   SCHOOL HEAD DASHBOARD SEARCH
========================================================= */

function searchHeadDashboard() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    const search =
        input.value.toLowerCase().trim();

    const rooms =
        document.querySelectorAll(".room-card");

    rooms.forEach(function (room) {

        const text =
            room.innerText.toLowerCase();

        room.style.display =
            text.includes(search)
                ? ""
                : "none";
    });
}


/* =========================================================
   OPEN INVENTORY
========================================================= */

function openInventory(room) {

    window.location.href =
        "inventory.html?room=" + room;
}


/* =========================================================
   ROOM DATA
========================================================= */

const roomInventory = {

    "18": {

        room: "Room 18",
        building: "Building 17",
        adviser: "Teacher A",

        photo:
            "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=80",

        items: [

            {
                item: "Armchairs",
                quantity: 30,
                damage: "2 broken"
            },

            {
                item: "Tables",
                quantity: 5,
                damage: "None"
            },

            {
                item: "Door",
                quantity: 1,
                damage: "Lock damaged"
            },

            {
                item: "Windows",
                quantity: 8,
                damage: "2 broken panes"
            },

            {
                item: "Lights",
                quantity: 6,
                damage: "None"
            },

            {
                item: "Electrical Outlets",
                quantity: 4,
                damage: "1 defective"
            },

            {
                item: "Electric Fans",
                quantity: 4,
                damage: "1 not working"
            }

        ]
    },


    "19": {

        room: "Room 19",
        building: "Building 17",
        adviser: "Teacher B",

        photo:
            "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80",

        items: [

            {
                item: "Armchairs",
                quantity: 30,
                damage: "1 broken"
            },

            {
                item: "Tables",
                quantity: 5,
                damage: "None"
            },

            {
                item: "Door",
                quantity: 1,
                damage: "None"
            },

            {
                item: "Windows",
                quantity: 8,
                damage: "None"
            },

            {
                item: "Lights",
                quantity: 6,
                damage: "None"
            },

            {
                item: "Electrical Outlets",
                quantity: 4,
                damage: "None"
            },

            {
                item: "Electric Fans",
                quantity: 4,
                damage: "None"
            }

        ]
    },


    "20": {

        room: "Room 20",
        building: "Building 17",
        adviser: "Teacher C",

        photo:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80",

        items: [

            {
                item: "Armchairs",
                quantity: 30,
                damage: "None"
            },

            {
                item: "Tables",
                quantity: 5,
                damage: "None"
            },

            {
                item: "Door",
                quantity: 1,
                damage: "None"
            },

            {
                item: "Windows",
                quantity: 8,
                damage: "1 cracked pane"
            },

            {
                item: "Lights",
                quantity: 6,
                damage: "None"
            },

            {
                item: "Electrical Outlets",
                quantity: 4,
                damage: "None"
            },

            {
                item: "Electric Fans",
                quantity: 4,
                damage: "1 not working"
            }

        ]
    }

};


/* =========================================================
   GET CURRENT ROOM
========================================================= */

function getCurrentRoomNumber() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get("room") || "18";
}


/* =========================================================
   LOAD INVENTORY
========================================================= */

function loadInventory() {

    const roomNumber =
        getCurrentRoomNumber();

    const room =
        roomInventory[roomNumber];

    if (!room) return;


    const roomTitle =
        document.getElementById("roomTitle");

    const buildingName =
        document.getElementById("buildingName");

    const roomAdviser =
        document.getElementById("roomAdviser");

    const classroomPhoto =
        document.getElementById("classroomPhoto");

    const roomPhoto =
        document.getElementById("roomPhoto");


    if (roomTitle) {
        roomTitle.textContent =
            room.room;
    }


    if (buildingName) {
        buildingName.textContent =
            room.building;
    }


    if (roomAdviser) {

        roomAdviser.textContent =
            room.building +
            " | Room Adviser: " +
            room.adviser;
    }


    if (classroomPhoto) {
        classroomPhoto.src =
            room.photo;
    }


    if (roomPhoto) {
        roomPhoto.src =
            room.photo;
    }


    loadInventoryTable(room);

    loadTeacherReports();
}


/* =========================================================
   GET MAINTENANCE STATUS FOR INVENTORY ITEM
========================================================= */

function getInventoryMaintenanceStatus(
    roomNumber,
    itemName
) {

    const reports =
        getRoomReports(roomNumber);

    const matchingReports =
        reports.filter(function (report) {

            return String(report.item)
                .toLowerCase()
                === String(itemName)
                    .toLowerCase();

        });


    if (matchingReports.length === 0) {
        return "No Report";
    }


    matchingReports.sort(
        function (a, b) {

            return new Date(
                b.dateReported
            ) -
            new Date(
                a.dateReported
            );

        }
    );


    const report =
        matchingReports[0];


    if (report.verification !== "Verified") {
        return "Pending Verification";
    }


    return report.status ||
        "Scheduled";
}


/* =========================================================
   LOAD INVENTORY TABLE
========================================================= */

function loadInventoryTable(room) {

    const tableBody =
        document.getElementById(
            "inventoryTableBody"
        );

    if (!tableBody) return;


    tableBody.innerHTML = "";


    const roomNumber =
        getCurrentRoomNumber();


    room.items.forEach(
        function (item, index) {

            const row =
                document.createElement("tr");


            const maintenanceStatus =
                getInventoryMaintenanceStatus(
                    roomNumber,
                    item.item
                );


            row.innerHTML = `

                <td>
                    ${item.item}
                </td>

                <td>

                    <input
                        class="inventory-quantity"
                        type="number"
                        value="${item.quantity}"
                        disabled
                        data-index="${index}"
                    >

                </td>

                <td>

                    <input
                        class="inventory-damage"
                        type="text"
                        value="${item.damage}"
                        disabled
                        data-index="${index}"
                    >

                </td>

                <td>

                    <span class="status locked">
                        ${maintenanceStatus}
                    </span>

                </td>

            `;


            tableBody.appendChild(row);

        }
    );
}


/* =========================================================
   ENABLE INVENTORY EDIT
========================================================= */

function enableInventoryEdit() {

    const quantityInputs =
        document.querySelectorAll(
            ".inventory-quantity"
        );

    const damageInputs =
        document.querySelectorAll(
            ".inventory-damage"
        );


    quantityInputs.forEach(
        function (input) {
            input.disabled = false;
        }
    );


    damageInputs.forEach(
        function (input) {
            input.disabled = false;
        }
    );


    const updateButton =
        document.getElementById(
            "updateInventoryButton"
        );

    const saveButton =
        document.getElementById(
            "saveInventoryButton"
        );


    if (updateButton) {
        updateButton.style.display =
            "none";
    }


    if (saveButton) {
        saveButton.style.display =
            "inline-block";
    }
}


/* =========================================================
   SAVE INVENTORY
========================================================= */

function saveInventoryChanges() {

    const roomNumber =
        getCurrentRoomNumber();

    const room =
        roomInventory[roomNumber];

    if (!room) return;


    const quantityInputs =
        document.querySelectorAll(
            ".inventory-quantity"
        );

    const damageInputs =
        document.querySelectorAll(
            ".inventory-damage"
        );


    quantityInputs.forEach(
        function (input) {

            const index =
                Number(input.dataset.index);

            room.items[index].quantity =
                Number(input.value);
        }
    );


    damageInputs.forEach(
        function (input) {

            const index =
                Number(input.dataset.index);

            room.items[index].damage =
                input.value;
        }
    );


    quantityInputs.forEach(
        function (input) {
            input.disabled = true;
        }
    );


    damageInputs.forEach(
        function (input) {
            input.disabled = true;
        }
    );


    const updateButton =
        document.getElementById(
            "updateInventoryButton"
        );

    const saveButton =
        document.getElementById(
            "saveInventoryButton"
        );


    if (updateButton) {
        updateButton.style.display =
            "inline-block";
    }


    if (saveButton) {
        saveButton.style.display =
            "none";
    }


    alert(
        "Inventory changes saved."
    );
}


/* =========================================================
   OLD SAVE FUNCTION
========================================================= */

function saveInventory() {
    saveInventoryChanges();
}


/* =========================================================
   CHANGE CLASSROOM PHOTO
========================================================= */

function changeRoomPhoto(event) {

    let input =
        event
            ? event.target
            : null;


    if (!input) {

        input =
            document.createElement(
                "input"
            );

        input.type = "file";
        input.accept = "image/*";


        input.addEventListener(
            "change",
            function () {

                changeRoomPhoto({
                    target: input
                });

            }
        );


        input.click();

        return;
    }


    const file =
        input.files[0];

    if (!file) return;


    const reader =
        new FileReader();


    reader.onload =
        function (event) {

            const classroomPhoto =
                document.getElementById(
                    "classroomPhoto"
                );

            const roomPhoto =
                document.getElementById(
                    "roomPhoto"
                );


            if (classroomPhoto) {
                classroomPhoto.src =
                    event.target.result;
            }


            if (roomPhoto) {
                roomPhoto.src =
                    event.target.result;
            }

        };


    reader.readAsDataURL(file);
}


/* =========================================================
   REPORT STORAGE
========================================================= */

const REPORT_STORAGE_KEY =
    "buildSafeMaintenanceReports";


function getReports() {

    const saved =
        localStorage.getItem(
            REPORT_STORAGE_KEY
        );


    if (!saved) {
        return [];
    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        return [];

    }
}


function saveReports(reports) {

    localStorage.setItem(
        REPORT_STORAGE_KEY,
        JSON.stringify(reports)
    );
}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateValue) {

    if (!dateValue) {
        return "—";
    }


    const date =
        new Date(dateValue);


    if (isNaN(date.getTime())) {
        return dateValue;
    }


    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
}


/* =========================================================
   FORMAT DATE + TIME
========================================================= */

function formatDateTime(dateValue) {

    if (!dateValue) {
        return "—";
    }


    const date =
        new Date(dateValue);


    if (isNaN(date.getTime())) {
        return dateValue;
    }


    return date.toLocaleString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }
    );
}


/* =========================================================
   SUBMIT DEFECT REPORT
========================================================= */

function submitReport(event) {

    if (event) {
        event.preventDefault();
    }


    const roomNumber =
        getCurrentRoomNumber();


    const room =
        "Room " + roomNumber;


    const itemElement =
        document.getElementById(
            "reportItem"
        );

    const quantityElement =
        document.getElementById(
            "reportQuantity"
        );

    const concernElement =
        document.getElementById(
            "reportType"
        );

    const descriptionElement =
        document.getElementById(
            "reportDescription"
        );


    const item =
        itemElement
            ? itemElement.value
            : "";


    const quantity =
        quantityElement
            ? quantityElement.value
            : "";


    const concern =
        concernElement
            ? concernElement.value
            : "";


    const description =
        descriptionElement
            ? descriptionElement.value.trim()
            : "";


    if (
        !item ||
        !quantity ||
        !concern ||
        !description
    ) {

        alert(
            "Please complete the required report information."
        );

        return;
    }


    const reports =
        getReports();


    const now =
        new Date().toISOString();


    const newReport = {

        id:
            Date.now().toString(),

        room:
            room,

        roomNumber:
            roomNumber,

        item:
            item,

        quantity:
            quantity,

        concern:
            concern,

        description:
            description,

        dateReported:
            now,

        verification:
            "Pending Verification",

        verifiedDate:
            "",

        status:
            "",

        actualCompletion:
            "",

        statusHistory: [

            {
                status:
                    "Report Submitted",

                date:
                    now
            }

        ]
    };


    reports.push(newReport);

    saveReports(reports);


    alert(
        "Defect report submitted successfully."
    );


    if (event && event.target) {
        event.target.reset();
    }


    loadTeacherReports();

    updateReportRoomBadges();

    loadInventory();
}


/* =========================================================
   GET ROOM REPORTS
========================================================= */

function getRoomReports(roomNumber) {

    const reports =
        getReports();


    return reports.filter(
        function (report) {

            return String(
                report.roomNumber
            ) === String(roomNumber);

        }
    );
}


/* =========================================================
   GET LATEST ROOM REPORT
========================================================= */

function getLatestRoomReport(roomNumber) {

    const reports =
        getRoomReports(roomNumber);


    if (reports.length === 0) {
        return null;
    }


    reports.sort(
        function (a, b) {

            return new Date(
                b.dateReported
            ) -
            new Date(
                a.dateReported
            );

        }
    );


    return reports[0];
}


/* =========================================================
   GET LAST REPORT UPDATE
========================================================= */

function getLastReportUpdate(report) {

    if (!report) {
        return null;
    }


    if (
        report.statusHistory &&
        report.statusHistory.length > 0
    ) {

        return report.statusHistory[
            report.statusHistory.length - 1
        ];
    }


    return {

        status:
            report.verification ||
            "Report Submitted",

        date:
            report.dateReported
    };
}


/* =========================================================
   LOAD TEACHER MAINTENANCE HISTORY
========================================================= */

function loadTeacherReports() {

    const container =
        document.getElementById(
            "maintenanceReports"
        );


    if (!container) return;


    const roomNumber =
        getCurrentRoomNumber();


    const reports =
        getRoomReports(roomNumber);


    if (reports.length === 0) {

        container.innerHTML = `

            <tr>

                <td colspan="4">
                    No maintenance history for this room yet.
                </td>

            </tr>

        `;

        return;
    }


    reports.sort(
        function (a, b) {

            return new Date(
                b.dateReported
            ) -
            new Date(
                a.dateReported
            );

        }
    );


    container.innerHTML = "";


    reports.forEach(
        function (report) {

            const lastUpdate =
                getLastReportUpdate(report);


            const currentStatus =
                report.verification !== "Verified"
                    ? "Pending Verification"
                    : (
                        report.status ||
                        "Scheduled"
                    );


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${report.item || "—"}
                </td>


                <td>
                    ${report.quantity || "—"}
                </td>


                <td>
                    ${currentStatus}
                </td>


                <td>
                    ${
                        lastUpdate
                            ? formatDateTime(
                                lastUpdate.date
                            )
                            : "—"
                    }
                </td>

            `;


            container.appendChild(row);

        }
    );

}


/* =========================================================
   SCHOOL HEAD REPORT LIST
========================================================= */

function loadHeadReports() {

    const container =
        document.getElementById(
            "headMaintenanceReports"
        );


    if (!container) return;


    const reports =
        getReports();


    if (reports.length === 0) {

        container.innerHTML = `

            <div class="maintenance-report">

                <h3>
                    No maintenance reports yet.
                </h3>

                <p>
                    Teacher reports will appear here.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML = "";


    reports
        .slice()
        .reverse()
        .forEach(
            function (report) {

                const reportBox =
                    document.createElement(
                        "div"
                    );


                reportBox.className =
                    "maintenance-report";


                reportBox.innerHTML = `

                    <h3>
                        ${report.room}
                    </h3>

                    <div class="report-information">

                        <p>
                            <strong>
                                Item:
                            </strong>

                            ${report.item}
                        </p>

                        <p>
                            <strong>
                                Quantity:
                            </strong>

                            ${report.quantity}
                        </p>

                        <p>
                            <strong>
                                Concern:
                            </strong>

                            ${report.concern}
                        </p>

                        <p>
                            <strong>
                                Reported:
                            </strong>

                            ${formatDate(
                                report.dateReported
                            )}
                        </p>

                        <p>
                            <strong>
                                Verification:
                            </strong>

                            ${report.verification}
                        </p>

                        <p>
                            <strong>
                                Maintenance:
                            </strong>

                            ${report.status ||
                                "Not Started"}
                        </p>

                    </div>

                `;


                container.appendChild(
                    reportBox
                );

            }
        );
}


/* =========================================================
   UPDATE REPORT BADGES
========================================================= */

function updateReportRoomBadges() {

    const reports =
        getReports();


    const rooms =
        ["18", "19", "20"];


    let newCount = 0;


    rooms.forEach(
        function (room) {

            const badge =
                document.getElementById(
                    "newUpdate" + room
                );


            if (!badge) return;


            const roomReports =
                reports.filter(
                    function (report) {

                        return String(
                            report.roomNumber
                        ) === room;

                    }
                );


            if (roomReports.length > 0) {

                roomReports.sort(
                    function (a, b) {

                        return new Date(
                            b.dateReported
                        ) -
                        new Date(
                            a.dateReported
                        );

                    }
                );


                const latest =
                    roomReports[0];


                if (
                    latest.verification ===
                    "Pending Verification"
                ) {

                    badge.style.display =
                        "inline-block";

                    newCount++;

                } else {

                    badge.style.display =
                        "none";

                }

            } else {

                badge.style.display =
                    "none";

            }

        }
    );


    const totalBadge =
        document.getElementById(
            "newReportBadge"
        );


    if (totalBadge) {

        totalBadge.textContent =
            newCount + " New Updates";

    }
}


/* =========================================================
   SCHOOL HEAD SUMMARY
========================================================= */

function updateHeadSummary() {

    const reports =
        getReports();


    const total =
        document.getElementById(
            "totalReports"
        );

    const pending =
        document.getElementById(
            "pendingReports"
        );

    const verified =
        document.getElementById(
            "verifiedReports"
        );

    const completed =
        document.getElementById(
            "completedReports"
        );


    if (total) {
        total.textContent =
            reports.length;
    }


    if (pending) {

        pending.textContent =
            reports.filter(
                function (report) {

                    return report.verification ===
                        "Pending Verification";

                }
            ).length;

    }


    if (verified) {

        verified.textContent =
            reports.filter(
                function (report) {

                    return report.verification ===
                        "Verified";

                }
            ).length;

    }


    if (completed) {

        completed.textContent =
            reports.filter(
                function (report) {

                    return report.status ===
                        "Completed";

                }
            ).length;

    }
}


/* =========================================================
   VERIFY CURRENT REPORT
========================================================= */

function verifyCurrentReport() {

    const roomNumber =
        getCurrentRoomNumber();


    const reports =
        getReports();


    const roomReports =
        reports.filter(
            function (report) {

                return String(
                    report.roomNumber
                ) === String(roomNumber);

            }
        );


    if (roomReports.length === 0) {

        alert(
            "No report found for this room."
        );

        return;
    }


    roomReports.sort(
        function (a, b) {

            return new Date(
                b.dateReported
            ) -
            new Date(
                a.dateReported
            );

        }
    );


    const report =
        roomReports[0];


    if (
        report.verification ===
        "Verified"
    ) {

        alert(
            "This report is already verified."
        );

        return;
    }


    const now =
        new Date().toISOString();


    report.verification =
        "Verified";


    report.verifiedDate =
        now;


    if (!report.status) {

        report.status =
            "Scheduled";


        if (!report.statusHistory) {
            report.statusHistory = [];
        }


        report.statusHistory.push({

            status:
                "Scheduled",

            date:
                now

        });

    }


    saveReports(reports);


    loadReportDetails();

    loadHeadReports();

    updateReportRoomBadges();

    updateHeadSummary();

}


/* =========================================================
   UPDATE MAINTENANCE STATUS
========================================================= */

function updateCurrentReportStatus(newStatus) {

    const roomNumber =
        getCurrentRoomNumber();


    if (!newStatus) return;


    const reports =
        getReports();


    const roomReports =
        reports.filter(
            function (report) {

                return String(
                    report.roomNumber
                ) === String(roomNumber);

            }
        );


    if (roomReports.length === 0) {

        alert(
            "No report found for this room."
        );

        return;
    }


    roomReports.sort(
        function (a, b) {

            return new Date(
                b.dateReported
            ) -
            new Date(
                a.dateReported
            );

        }
    );


    const report =
        roomReports[0];


    if (
        report.verification !==
        "Verified"
    ) {

        alert(
            "Please verify the report first."
        );

        loadReportDetails();

        return;
    }


    const now =
        new Date().toISOString();


    report.status =
        newStatus;


    if (!report.statusHistory) {
        report.statusHistory = [];
    }


    report.statusHistory.push({

        status:
            newStatus,

        date:
            now

    });


    if (
        newStatus ===
        "Completed"
    ) {

        report.actualCompletion =
            now;

    }


    saveReports(reports);


    loadReportDetails();

    loadHeadReports();

    updateReportRoomBadges();

    updateHeadSummary();

}


/* =========================================================
   COMPATIBILITY FUNCTION
========================================================= */

function changeRepairStatus(status) {

    updateCurrentReportStatus(
        status
    );

}


/* =========================================================
   VERIFICATION CONTROLS
========================================================= */

function updateVerificationControls(report) {

    const button =
        document.getElementById(
            "verifyReportButton"
        );

    const verification =
        document.getElementById(
            "detailVerification"
        );

    const verifiedDate =
        document.getElementById(
            "detailVerifiedDate"
        );

    const badge =
        document.getElementById(
            "reportVerificationBadge"
        );

    const controls =
        document.getElementById(
            "maintenanceControls"
        );

    const locked =
        document.getElementById(
            "maintenanceLocked"
        );


    if (!report) return;


    if (verification) {

        verification.textContent =
            report.verification ||
            "Pending Verification";

    }


    if (verifiedDate) {

        verifiedDate.textContent =
            report.verifiedDate
                ? formatDate(
                    report.verifiedDate
                )
                : "—";

    }


    if (badge) {

        badge.textContent =
            report.verification ||
            "Pending Verification";


        if (
            report.verification ===
            "Verified"
        ) {

            badge.style.background =
                "#e8f5e9";

            badge.style.color =
                "#2e7d32";

        } else {

            badge.style.background =
                "#fff3cd";

            badge.style.color =
                "#856404";

        }

    }


    if (button) {

        if (
            report.verification ===
            "Verified"
        ) {

            button.textContent =
                "✓ Report Verified";

            button.disabled =
                true;

            button.style.opacity =
                "0.6";

        } else {

            button.textContent =
                "✓ Verify Report";

            button.disabled =
                false;

            button.style.opacity =
                "1";

        }

    }


    if (controls && locked) {

        if (
            report.verification ===
            "Verified"
        ) {

            controls.style.display =
                "block";

            locked.style.display =
                "none";

        } else {

            controls.style.display =
                "none";

            locked.style.display =
                "block";

        }

    }


    const statusSelect =
        document.getElementById(
            "repairStatus"
        );


    if (statusSelect) {

        statusSelect.value =
            report.status || "";

    }
}


/* =========================================================
   MAINTENANCE TIMELINE
========================================================= */

function createMaintenanceTimeline(report) {

    if (!report) {

        return `
            <p>
                No history available.
            </p>
        `;
    }


    const history =
        report.statusHistory || [];


    if (history.length === 0) {

        return `
            <p>
                No history available.
            </p>
        `;
    }


    return history
        .map(
            function (entry) {

                return `

                    <div class="timeline-item">

                        <div class="timeline-dot"></div>

                        <div class="timeline-content">

                            <strong>
                                ${entry.status}
                            </strong>

                            <span>
                                ${formatDateTime(
                                    entry.date
                                )}
                            </span>

                        </div>

                    </div>

                `;

            }
        )
        .join("");
}


/* =========================================================
   LOAD REPORT DETAILS
========================================================= */

function loadReportDetails() {

    const detailRoom =
        document.getElementById(
            "detailRoom"
        );


    if (!detailRoom) return;


    const roomNumber =
        getCurrentRoomNumber();


    const report =
        getLatestRoomReport(
            roomNumber
        );


    if (!report) {

        const item =
            document.getElementById(
                "detailItem"
            );

        const quantity =
            document.getElementById(
                "detailQuantity"
            );

        const concern =
            document.getElementById(
                "detailConcern"
            );

        const reported =
            document.getElementById(
                "detailReported"
            );

        const description =
            document.getElementById(
                "detailDescription"
            );


        detailRoom.textContent =
            "Room " +
            roomNumber +
            " • Building 17";


        if (item) {
            item.textContent = "—";
        }

        if (quantity) {
            quantity.textContent = "—";
        }

        if (concern) {
            concern.textContent = "—";
        }

        if (reported) {
            reported.textContent = "—";
        }

        if (description) {

            description.textContent =
                "No report has been submitted for this room.";

        }

        return;
    }


    detailRoom.textContent =
        report.room +
        " • Building 17";


    const detailItem =
        document.getElementById(
            "detailItem"
        );

    const detailQuantity =
        document.getElementById(
            "detailQuantity"
        );

    const detailConcern =
        document.getElementById(
            "detailConcern"
        );

    const detailReported =
        document.getElementById(
            "detailReported"
        );

    const detailDescription =
        document.getElementById(
            "detailDescription"
        );

    const detailStatus =
        document.getElementById(
            "detailStatus"
        );

    const detailLastUpdated =
        document.getElementById(
            "detailLastUpdated"
        );

    const timeline =
        document.getElementById(
            "reportTimeline"
        );


    if (detailItem) {
        detailItem.textContent =
            report.item;
    }


    if (detailQuantity) {
        detailQuantity.textContent =
            report.quantity || "—";
    }


    if (detailConcern) {
        detailConcern.textContent =
            report.concern;
    }


    if (detailReported) {

        detailReported.textContent =
            formatDate(
                report.dateReported
            );

    }


    if (detailDescription) {

        detailDescription.textContent =
            report.description ||
            "No additional description.";

    }


    if (detailStatus) {

        detailStatus.textContent =
            report.status ||
            "Not Started";

    }


    const lastUpdate =
        getLastReportUpdate(report);


    if (detailLastUpdated) {

        detailLastUpdated.textContent =
            lastUpdate
                ? formatDateTime(
                    lastUpdate.date
                )
                : "—";

    }


    updateVerificationControls(
        report
    );


    if (timeline) {

        timeline.innerHTML =
            createMaintenanceTimeline(
                report
            );

    }
}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* INVENTORY */

        if (
            document.getElementById(
                "inventoryTableBody"
            )
        ) {

            loadInventory();

        }


        /* TEACHER MAINTENANCE HISTORY */

        if (
            document.getElementById(
                "maintenanceReports"
            )
        ) {

            loadTeacherReports();

        }


        /* SCHOOL HEAD REPORTS */

        if (
            document.getElementById(
                "newReportBadge"
            )
        ) {

            loadHeadReports();

            updateReportRoomBadges();

            updateHeadSummary();

        }


        /* REPORT DETAILS */

        if (
            document.getElementById(
                "detailRoom"
            )
        ) {

            loadReportDetails();

        }

    }
);