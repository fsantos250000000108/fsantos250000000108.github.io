// 1. Target DOM Nodes (Matching Slide 7)
const categoryNameInput = document.getElementById("txtCatName");
const categoryDescInput = document.getElementById("txtCatDesc");
const addCategoryBtn = document.getElementById("btnAdd");
const incomeTableBody = document.getElementById("listIncomeCat");

// 2. Attach Non-Inline Event Listener
addCategoryBtn.addEventListener("click", handleAddCategory);

// 3. Controller Action
function handleAddCategory() {
  const catName = categoryNameInput.value.trim();
  const catDesc = categoryDescInput.value.trim();

  // Guard Clause Validation
  if (!catName || !catDesc) {
    alert("Please complete both input fields.");
    return;
  }

  // remove the row
  removeEmptyStateRow();

  // Construct Row Markup
  // remove btn in line 31
  const newRowHTML = `
    <tr>
      <td class="fw-semibold text-dark">${catName}</td>
      <td class="text-secondary">${catDesc}</td>
      <td class="text-end">
        <button type="button" class="btn btn-sm btn-outline-danger btnDeleteCat">Remove</button>
      </td>
    </tr>
  `;

  // Dynamic RAM Insertion
  incomeTableBody.insertAdjacentHTML("beforeend", newRowHTML);

  // Reset Inputs & Refocus
  categoryNameInput.value = "";
  categoryDescInput.value = "";
  categoryNameInput.focus();
}

// 4. Row Deletion (Event Delegation)
// Lets a category row be removed so the empty state can be re-triggered.
incomeTableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("btnDeleteCat")) {
    event.target.closest("tr").remove();
    checkEmptyState();
  }
});

// 5. Empty State Placeholder — Group 2 Core Task
// Renders a full-width row inside the <tbody> when no categories exist.
function renderEmptyStateRow() {
  const emptyRowHTML = `
    <tr id="emptyStateRow">
      <td colspan="3" class="text-center text-muted fst-italic py-4">
        No categories registered yet.
      </td>
    </tr>
  `;
  incomeTableBody.insertAdjacentHTML("beforeend", emptyRowHTML);
}

// Removes the placeholder row if it is currently present.
function removeEmptyStateRow() {
  const emptyRow = document.getElementById("emptyStateRow");
  if (emptyRow) {
    emptyRow.remove();
  }
}

// Mandatory Technique: inspect tableBody.children.length directly.
// This is the single source of truth for whether the table is "empty" —
// it works no matter how a row was added or removed.
function checkEmptyState() {
  if (incomeTableBody.children.length === 0) {
    renderEmptyStateRow();
  }
}

// 6. Initial Load Check
// The table starts with zero <tr> elements, so the placeholder
// must render immediately on page load.
checkEmptyState();
