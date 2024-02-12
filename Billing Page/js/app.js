function boxHighlight(id) {
  const clickedBox = document.getElementById(id);

  if (clickedBox) {
    // Get all elements with the class "expanded-fields" within the clicked box
    const expandedFields = clickedBox.getElementsByClassName("expanded-fields");

    // Hide all "expanded-fields" elements in all boxes
    const allExpandedFields = document.querySelectorAll(".expanded-fields");
    allExpandedFields.forEach(function (field) {
      field.style.display = "none";
    });

    // Show the "expanded-fields" within the clicked box
    for (let i = 0; i < expandedFields.length; i++) {
      expandedFields[i].style.display = "block";
    }
  }
}
