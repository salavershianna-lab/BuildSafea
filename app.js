
/* =========================================================
   LOGIN
========================================================= */

function schoolHeadLogin() {

    sessionStorage.setItem(
        "buildSafeRole",
        "schoolHead"
    );

    window.location.href =
        "dashboard-head.html";
}


function teacherAdviserLogin() {

    sessionStorage.setItem(
        "buildSafeRole",
        "teacher"
    );

    window.location.href =
        "dashboard.html";
}


/* =========================================================
   NAVIGATION
========================================================= */

function Dashboard() {

    const role =
        sessionStorage.getItem(
            "buildSafeRole"
        );

    if (role === "schoolHead") {

        window.location.href =
            "dashboard-head.html";

    } else {

        window.location.href =
            "dashboard.html";

    }
}


function Classroom() {

    const role =
        sessionStorage.getItem(
            "buildSafeRole"
        );

    if (role === "schoolHead") {

        window.location.href =
            "dashboard-head.html";

    } else {

        window.location.href =
            "dashboard-head.html";

    }
}


function Reports() {

    const role =
        sessionStorage.getItem(
            "buildSafeRole"
        );

    if (!role) {

        sessionStorage.setItem(
            "buildSafeRole",
            "teacher"
        );

    }

    window.location.href =
        "reports.html";
}


function openReport(room) {

    window.location.href =
        "reports-inside.html?room=" +
        room;
}


function logout() {

    sessionStorage.removeItem(
        "buildSafeRole"
    );

    window.location.href =
        "index.html";
}


/* =========================================================
   TEACHER DASHBOARD SEARCH
========================================================= */

function searchDashboard() {

    const input =
        document.getElementById(
            "searchInput"
        );

    if (!input) return;

    const search =
        input.value
            .toLowerCase()
            .trim();

    const rooms =
        document.querySelectorAll(
            ".room-card"
        );

    rooms.forEach(function (room) {

        const text =
            room.innerText
                .toLowerCase();

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
        document.getElementById(
            "searchInput"
        );

    if (!input) return;

    const search =
        input.value
            .toLowerCase()
            .trim();

    const rooms =
        document.querySelectorAll(
            ".room-card"
        );

    rooms.forEach(function (room) {

        const text =
            room.innerText
                .toLowerCase();

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
        "inventory.html?room=" +
        room;
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
                quantity: 40,
                damage: "2"
            },

            {
                item: "Tables",
                quantity: 20,
                damage: "None"
            },

            {
                item: "Door",
                quantity: 2,
                damage: "1"
            },

            {
                item: "Windows",
                quantity: 8,
                damage: "2"
            },

            {
                item: "Lights",
                quantity: 6,
                damage: "1"
            },

            {
                item: "Electrical Outlets",
                quantity: 4,
                damage: "1"
            },

            {
                item: "Electric Fans",
                quantity: 5,
                damage: "1"
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
   LOAD SAVED INVENTORY
========================================================= */

function loadSavedInventory() {

    const savedInventory =
        localStorage.getItem(
            "buildSafeInventory"
        );

    if (!savedInventory) {
        return;
    }

    try {

        const savedData =
            JSON.parse(
                savedInventory
            );

        Object.keys(savedData).forEach(
            function (roomNumber) {

                if (
                    roomInventory[roomNumber] &&
                    savedData[roomNumber] &&
                    savedData[roomNumber].items
                ) {

                    roomInventory[roomNumber].items =
                        savedData[roomNumber].items;

                }

            }
        );

    } catch (error) {

        console.error(
            "Unable to load saved inventory:",
            error
        );

    }

}


/* =========================================================
   GET CURRENT ROOM
========================================================= */

function getCurrentRoomNumber() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return (
        params.get("room") ||
        "18"
    );
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
        document.getElementById(
            "roomTitle"
        );

    const buildingName =
        document.getElementById(
            "buildingName"
        );

    const roomAdviser =
        document.getElementById(
            "roomAdviser"
        );

    const classroomPhoto =
        document.getElementById(
            "classroomPhoto"
        );

    const roomPhoto =
        document.getElementById(
            "roomPhoto"
        );


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


    loadInventoryTable(
        room
    );

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
        getRoomReports(
            roomNumber
        );


    const matchingReports =
        reports.filter(
            function (report) {

                return String(
                    report.item
                ).toLowerCase() ===
                String(
                    itemName
                ).toLowerCase();

            }
        );


    if (
        matchingReports.length ===
        0
    ) {

        return `
            <span class="inventory-status no-report">
                No Report
            </span>
        `;

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


    if (
        report.verification !==
        "Verified"
    ) {

        return `
            <span class="inventory-status pending-verification">
                Pending Verification
            </span>
        `;

    }


    const status =
        report.status ||
        "Awaiting Status";


    const statusClass =
        status
            .toLowerCase()
            .replace(
                /\s+/g,
                "-"
            );


    return `
        <span class="inventory-status ${statusClass}">
            ${status}
        </span>
    `;
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


    tableBody.innerHTML =
        "";


    const roomNumber =
        getCurrentRoomNumber();


    room.items.forEach(
        function (item, index) {

            const row =
                document.createElement(
                    "tr"
                );


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


            tableBody.appendChild(
                row
            );

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

            input.disabled =
                false;

        }
    );


    damageInputs.forEach(
        function (input) {

            input.disabled =
                false;

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
                Number(
                    input.dataset.index
                );

            const quantity =
                Number(
                    input.value
                );

            room.items[index].quantity =
                Number.isFinite(
                    quantity
                )
                    ? quantity
                    : 0;

        }
    );


    damageInputs.forEach(
        function (input) {

            const index =
                Number(
                    input.dataset.index
                );

            room.items[index].damage =
                input.value;

        }
    );


    localStorage.setItem(
        "buildSafeInventory",
        JSON.stringify(
            roomInventory
        )
    );


    quantityInputs.forEach(
        function (input) {

            input.disabled =
                true;

        }
    );


    damageInputs.forEach(
        function (input) {

            input.disabled =
                true;

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

        input.type =
            "file";

        input.accept =
            "image/*";


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


    reader.readAsDataURL(
        file
    );

}


/* =========================================================
   REPORT STORAGE — PRESERVE REPORT HISTORY
========================================================= */

const REPORT_STORAGE_KEY = "buildSafeMaintenanceReports";
const REPORT_STORAGE_BACKUP_KEY =
    "buildSafeMaintenanceReportsBackup";

function getReports() {
    const saved = localStorage.getItem(REPORT_STORAGE_KEY);

    if (saved) {
        try {
            const reports = JSON.parse(saved);

            if (Array.isArray(reports)) {
                return reports;
            }
        } catch (error) {
            console.error("Main report storage could not be read.");
        }
    }

    // Recover from the last saved backup if the main data is unreadable.
    const backup = localStorage.getItem(REPORT_STORAGE_BACKUP_KEY);

    if (backup) {
        try {
            const reports = JSON.parse(backup);

            if (Array.isArray(reports)) {
                localStorage.setItem(
                    REPORT_STORAGE_KEY,
                    JSON.stringify(reports)
                );

                return reports;
            }
        } catch (error) {
            console.error("Report backup could not be read.");
        }
    }

    return [];
}

function saveReports(reports) {
    if (!Array.isArray(reports)) {
        console.error("Reports were not saved: invalid data.");
        return;
    }

    const serialized = JSON.stringify(reports);

    // Keep the latest valid saved list as a recovery copy.
    try {
        localStorage.setItem(
            REPORT_STORAGE_BACKUP_KEY,
            serialized
        );
    } catch (error) {
        console.error("Could not save report backup:", error);
    }

    localStorage.setItem(
        REPORT_STORAGE_KEY,
        serialized
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
        new Date(
            dateValue
        );


    if (
        isNaN(
            date.getTime()
        )
    ) {

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
        new Date(
            dateValue
        );


    if (
        isNaN(
            date.getTime()
        )
    ) {

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
        "Room " +
        roomNumber;


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


    reports.push(
        newReport
    );


    saveReports(
        reports
    );


    alert(
        "Defect report submitted successfully."
    );


    if (
        event &&
        event.target
    ) {

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
    return getReports().filter(function (report) {
        let savedRoomNumber = report.roomNumber;

        if (
            savedRoomNumber === undefined ||
            savedRoomNumber === null ||
            savedRoomNumber === ""
        ) {
            const match = String(report.room || "").match(
                /room\s*(\d+)/i
            );

            savedRoomNumber = match ? match[1] : "";
        }

        return String(savedRoomNumber) === String(roomNumber);
    });
}


/* =========================================================
   GET LATEST ROOM REPORT
   Used only for inventory item status.
========================================================= */

function getLatestRoomReport(
    roomNumber
) {

    const reports =
        getRoomReports(
            roomNumber
        );


    if (
        reports.length ===
        0
    ) {

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

function getLastReportUpdate(
    report
) {

    if (!report) {

        return null;

    }


    if (
        report.statusHistory &&
        report.statusHistory.length >
        0
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
        getRoomReports(
            roomNumber
        );


    if (
        reports.length ===
        0
    ) {

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


    container.innerHTML =
        "";


    reports.forEach(
        function (report) {

            const lastUpdate =
                getLastReportUpdate(
                    report
                );


            const currentStatus =
                report.verification !==
                "Verified"

                    ? "Pending Verification"

                    : (
                        report.status ||
                        "Awaiting Status"
                    );


            const row =
                document.createElement(
                    "tr"
                );


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


            container.appendChild(
                row
            );

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


    container.innerHTML =
        "";


    if (
        reports.length ===
        0
    ) {

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


    reports
        .slice()
        .sort(
            function (a, b) {

                return new Date(
                    b.dateReported
                ) -
                new Date(
                    a.dateReported
                );

            }
        )
        .forEach(
            function (report) {

                const reportBox =
                    document.createElement(
                        "div"
                    );


                reportBox.className =
                    "maintenance-report";


                const maintenanceStatus =
                    report.status ||
                    "Awaiting Status";


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

                            ${formatDateTime(
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

                            ${maintenanceStatus}
                        </p>

                        <button
                            type="button"
                            onclick="openReportById('${report.id}')"
                        >
                            View Report
                        </button>

                    </div>

                `;


                container.appendChild(
                    reportBox
                );

            }
        );

}


function openReport(room) {
    const roomReports = getRoomReports(room);

    if (roomReports.length === 0) {
        alert("Wala pang report para sa Room " + room + ".");
        return;
    }

    // Pending verification reports come first.
    const sortedReports = roomReports.slice().sort(function (a, b) {
        const aPending =
            a.verification !== "Verified";

        const bPending =
            b.verification !== "Verified";

        if (aPending !== bPending) {
            return aPending ? -1 : 1;
        }

        return new Date(b.dateReported || 0) -
            new Date(a.dateReported || 0);
    });

    openReportById(sortedReports[0].id);
}

function openReportById(reportId) {
    if (!reportId) {
        alert("Walang napiling report.");
        return;
    }

    window.location.href =
        "reports-inside.html?id=" +
        encodeURIComponent(reportId);
}


/* =========================================================
   SCHOOL HEAD REPORT BADGES
========================================================= */

function updateReportRoomBadges() {
    const reports = getReports();
    const rooms = ["18", "19", "20"];
    let totalNewRooms = 0;

    rooms.forEach(function (roomNumber) {
        const badge = document.getElementById(
            "newUpdate" + roomNumber
        );

        if (!badge) return;

        const hasPendingReport = reports.some(function (report) {
            // Read the room number, including values like "Room 18".
            const roomValue = [
                report.roomNumber,
                report.room,
                report.classroom,
                report.roomId
            ].find(function (value) {
                return value !== undefined &&
                    value !== null &&
                    String(value).trim() !== "";
            });

            const match = String(roomValue || "").match(/\d+/);
            const savedRoomNumber = match ? match[0] : "";

            const verification = String(
                report.verification || "Pending Verification"
            ).trim().toLowerCase();

            return savedRoomNumber === roomNumber &&
                verification !== "verified";
        });

        badge.textContent = "NEW UPDATE";
        badge.style.display = hasPendingReport
            ? "inline-block"
            : "none";

        if (hasPendingReport) {
            totalNewRooms++;
        }
    });

    // Keep the total badge visible, including when the count is zero.
    const totalBadge = document.getElementById("newReportBadge");

    if (totalBadge) {
        totalBadge.textContent = totalNewRooms + " New Updates";
        totalBadge.style.display = "inline-block";
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


    /* =====================================================
       ADD REPORTED DEFECTS TO INVENTORY
    ===================================================== */

    const room =
        roomInventory[roomNumber];

    if (room && room.items) {

        const matchingItem =
            room.items.find(
                function (item) {

                    return String(
                        item.item
                    ).toLowerCase()
                    ===
                    String(
                        report.item
                    ).toLowerCase();

                }
            );

        if (matchingItem) {

            const currentDefects =
                Number(
                    matchingItem.damage
                ) || 0;

            const reportedDefects =
                Number(
                    report.quantity
                ) || 0;

            matchingItem.damage =
                currentDefects +
                reportedDefects;

        }


        /* SAVE UPDATED INVENTORY */

        localStorage.setItem(
            "buildSafeInventory",
            JSON.stringify(roomInventory)
        );

    }
/* =====================================================
   VERIFY REPORT
===================================================== */

report.verification =
    "Verified";

report.verifiedDate =
    now;


/* =====================================================
   SET INITIAL STATUS TO SCHEDULED
===================================================== */

if (!report.status) {

    report.status =
        "Select Status";

    if (!report.statusHistory) {

        report.statusHistory = [];

    }

    report.statusHistory.push({

        status:
            "Select Status",

        date:
            now

    });

}


/* =====================================================
   SAVE REPORT
===================================================== */

saveReports(reports);


/* =====================================================
   REFRESH EVERYTHING
===================================================== */

loadInventory();

loadReportDetails();

loadHeadReports();

updateReportRoomBadges();

updateHeadSummary();


alert(
    "Report verified successfully. Defect count has been updated."
);

}
/* =========================================================
   COMPATIBILITY FUNCTION
========================================================= */

function changeRepairStatus(
    status
) {

    updateCurrentReportStatus(
        status
    );

}

/* =========================================================
   UPDATE MAINTENANCE STATUS
========================================================= */

function updateCurrentReportStatus(newStatus) {
    if (!newStatus) return;

    const allowedStatuses = [
        "Scheduled",
        "In Progress",
        "Completed"
    ];

    if (!allowedStatuses.includes(newStatus)) {
        alert("Invalid maintenance status.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const reportId = params.get("id");

    if (!reportId) {
        alert("Walang napiling report.");
        return;
    }

    const reports = getReports();
    const report = reports.find(function (item) {
        return String(item.id) === String(reportId);
    });

    if (!report) {
        alert("Hindi makita ang report.");
        return;
    }

    if (report.verification !== "Verified") {
        alert("I-verify muna ang report bago baguhin ang maintenance status.");
        loadReportDetails();
        return;
    }

    if (report.status === newStatus) return;

    const now = new Date().toISOString();
    const roomNumber = String(
        report.roomNumber ||
        String(report.room || "").replace(/\D/g, "")
    );

    report.status = newStatus;

    if (!Array.isArray(report.statusHistory)) {
        report.statusHistory = [];
    }

    report.statusHistory.push({
        status: newStatus,
        date: now
    });

    if (newStatus === "Completed") {
        const savedText = localStorage.getItem("buildSafeInventory");

        let savedInventory = {};

        try {
            savedInventory = savedText ? JSON.parse(savedText) : {};
        } catch (error) {
            console.error("Unable to read saved inventory:", error);
            alert("Hindi mabasa ang saved inventory.");
            return;
        }

        const savedRoom = savedInventory[roomNumber];

        if (!savedRoom || !Array.isArray(savedRoom.items)) {
            alert("Hindi makita ang inventory para sa Room " + roomNumber + ".");
            return;
        }

        const matchingItem = savedRoom.items.find(function (item) {
            return String(item.item).trim().toLowerCase() ===
                String(report.item).trim().toLowerCase();
        });

        if (!matchingItem) {
            alert("Hindi makita ang item na " + report.item +
                " sa inventory ng Room " + roomNumber + ".");
            return;
        }

        matchingItem.damage = "0";

        localStorage.setItem(
            "buildSafeInventory",
            JSON.stringify(savedInventory)
        );

        if (roomInventory[roomNumber] &&
            Array.isArray(roomInventory[roomNumber].items)) {
            const currentItem = roomInventory[roomNumber].items.find(function (item) {
                return String(item.item).trim().toLowerCase() ===
                    String(report.item).trim().toLowerCase();
            });

            if (currentItem) {
                currentItem.damage = "0";
            }
        }

        report.actualCompletion = now;
    }

    saveReports(reports);

    if (typeof loadSavedInventory === "function") {
        loadSavedInventory();
    }

    if (typeof loadInventory === "function") {
        loadInventory();
    }

    if (typeof loadReportDetails === "function") {
        loadReportDetails();
    }

    if (typeof loadHeadReports === "function") {
        loadHeadReports();
    }

    if (typeof updateReportRoomBadges === "function") {
        updateReportRoomBadges();
    }

    if (typeof updateHeadSummary === "function") {
        updateHeadSummary();
    }

    
    /* =====================================================
       WHEN COMPLETED, RESET MATCHING ITEM DAMAGE TO 0
    ===================================================== */

    if (newStatus === "Completed") {
        const savedInventoryText =
            localStorage.getItem("buildSafeInventory");

        let savedInventory = {};

        try {
            savedInventory = savedInventoryText
                ? JSON.parse(savedInventoryText)
                : {};
        } catch (error) {
            console.error("Unable to read saved inventory:", error);
            alert("Hindi mabasa ang saved inventory.");
            return;
        }

        const savedRoom = savedInventory[roomNumber];

        if (savedRoom && Array.isArray(savedRoom.items)) {
            const matchingItem = savedRoom.items.find(function (item) {
                return String(item.item).trim().toLowerCase() ===
                    String(report.item).trim().toLowerCase();
            });

            if (matchingItem) {
                matchingItem.damage = "0";

                localStorage.setItem(
                    "buildSafeInventory",
                    JSON.stringify(savedInventory)
                );

                if (
                    roomInventory[roomNumber] &&
                    Array.isArray(roomInventory[roomNumber].items)
                ) {
                    const currentItem = roomInventory[roomNumber].items.find(
                        function (item) {
                            return String(item.item).trim().toLowerCase() ===
                                String(report.item).trim().toLowerCase();
                        }
                    );

                    if (currentItem) {
                        currentItem.damage = "0";
                    }
                }
            } else {
                console.warn("Matching inventory item not found:", report.item);
            }
        } else {
            console.warn("Saved room inventory not found:", roomNumber);
        }

        report.actualCompletion = now;
    }


    /* SAVE REPORT */

    saveReports(reports);


    /* REFRESH EVERYTHING */

    loadInventory();

    loadReportDetails();

    loadHeadReports();

    updateReportRoomBadges();

    updateHeadSummary();

}

/* =========================================================
   VERIFICATION CONTROLS
========================================================= */

function updateVerificationControls(
    report
) {

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


    if (
        controls &&
        locked
    ) {

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
            report.status ||
            "";

    }

}


/* =========================================================
   MAINTENANCE TIMELINE
========================================================= */

function createMaintenanceTimeline(
    report
) {

    if (!report) {

        return `
            <p>
                No history available.
            </p>
        `;

    }


    const history =
        report.statusHistory ||
        [];


    if (
        history.length ===
        0
    ) {

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

                        <div class="timeline-dot">
                        </div>

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


    /* =====================================================
       GET SPECIFIC REPORT ID
    ===================================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const reportId =
        params.get("id");


    const reports =
        getReports();


    const report =
        reports.find(
            function (item) {

                return String(
                    item.id
                ) ===
                String(
                    reportId
                );

            }
        );


    /* =====================================================
       NO REPORT FOUND
    ===================================================== */

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
            "No report selected";


        if (item) {

            item.textContent =
                "—";

        }


        if (quantity) {

            quantity.textContent =
                "—";

        }


        if (concern) {

            concern.textContent =
                "—";

        }


        if (reported) {

            reported.textContent =
                "—";

        }


        if (description) {

            description.textContent =
                "No report was selected.";

        }


        return;

    }


    /* =====================================================
       ROOM INFORMATION
    ===================================================== */

    detailRoom.textContent =
        report.room +
        " • Building 17";


    /* =====================================================
       GET DETAIL ELEMENTS
    ===================================================== */

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


    /* =====================================================
       DISPLAY REPORT INFORMATION
    ===================================================== */

    if (detailItem) {

        detailItem.textContent =
            report.item ||
            "—";

    }


    if (detailQuantity) {

        detailQuantity.textContent =
            report.quantity ||
            "—";

    }


    if (detailConcern) {

        detailConcern.textContent =
            report.concern ||
            "—";

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

        if (
            report.verification !==
            "Verified"
        ) {

            detailStatus.textContent =
                "Pending Verification";

        } else {

            detailStatus.textContent =
                report.status ||
                "Awaiting Status";

        }

    }


    /* =====================================================
       LAST UPDATE
    ===================================================== */

    const lastUpdate =
        getLastReportUpdate(
            report
        );


    if (detailLastUpdated) {

        detailLastUpdated.textContent =
            lastUpdate
                ? formatDateTime(
                    lastUpdate.date
                )
                : "—";

    }


    /* =====================================================
       VERIFICATION CONTROLS
    ===================================================== */

    updateVerificationControls(
        report
    );


    /* =====================================================
       MAINTENANCE TIMELINE
    ===================================================== */

    if (timeline) {

        timeline.innerHTML =
            createMaintenanceTimeline(
                report
            );

    }

}



/* =========================================================
   INITIALIZE — BUILDSAFE DIHS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // LOAD SAVED INVENTORY
    loadSavedInventory();

    // INVENTORY PAGE
    if (document.getElementById("inventoryTableBody")) {
        loadInventory();
    }

    // TEACHER MAINTENANCE HISTORY
    if (document.getElementById("maintenanceReports")) {
        loadTeacherReports();
    }

    // SCHOOL HEAD DASHBOARD
    // Call these even if the total notification badge is absent.
    loadHeadReports();
    updateReportRoomBadges();
    updateHeadSummary();

    // REPORT DETAILS PAGE
    if (document.getElementById("detailRoom")) {
        loadReportDetails();
    }

});