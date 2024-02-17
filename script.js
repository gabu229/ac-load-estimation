const room = {
  length: 0,
  width: 0,
  height: 0,
};

const doors = {
  length: 0,
  width: 0,
  area: 0,
  north: 0,
  south: 0,
  east: 0,
  west: 0,
};

const windows = {
  length: 0,
  width: 0,
  area: 0,
  north: 0,
  south: 0,
  east: 0,
  west: 0,
};

const HEAT_COEFFICIENT = {
  roof: 0,
  floor: 0,
  walls: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
  doors: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
  windows: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
};

const AREA = {
  roof: 0,
  floor: 0,
  walls: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
  doors: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
  windows: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
};

const EQUIVALENT_TEMPERATURE_DIFF = {
  roof: 0,
  floor: 0,
  walls: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
  doors: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
  windows: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
};

const SENSIBLE_HEAT_GAIN = {
  roof: 0,
  floor: 0,
  walls: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
  doors: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
  windows: {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  },
};

$(document).ready(function () {
  doAllComputations();

  $("input").change(function () {
    doAllComputations();
  });

  $("input").keyup(function () {
    doAllComputations();
  });
});

function doAllComputations() {
  updateAllFieldValues();
  calculateWallsArea();
  calculateRoofAndFloorArea();
  calculateDoorsAndWindowsArea();
  calculateWallsAndDoorsAndWindowsSensibleHeatGain();
  calculateRoofAndFloorSensibleHeatGain();
  calculateTotalSensibleHeatGain();
  updateValuesInDisplay();
}

function calculateWallsArea() {
  let sections = ["north", "south", "east", "west"];

  sections.forEach((section) => {
    let wallArea;
    if (section === "east" || section === "west") {
      wallArea = room.height * room.width;
    } else {
      wallArea = room.height * room.length;
    }

    const totalDoorArea = doors.area * doors[section];
    const totalWindowArea = windows.area * windows[section];

    const calculationString = `${wallArea} - ${totalDoorArea} - ${totalWindowArea}`;
    const result = wallArea - totalDoorArea - totalWindowArea;

    // AREA.walls[section] = `${calculationString} = ${result}`;
    AREA.walls[section] = result;
  });
}

function calculateDoorsAndWindowsArea() {
  let sections = ["north", "south", "east", "west"];

  sections.forEach((section) => {
    const doorsArea = doors.area * doors[section];
    const windowsArea = windows.area * windows[section];

    AREA.doors[section] = doorsArea;
    AREA.windows[section] = windowsArea;
  });
}

function calculateRoofAndFloorArea() {
  let sections = ["roof", "floor"];

  sections.forEach((section) => {
    let calculationString = `${room.length} x ${room.width}`;
    let result = room.length * room.width;

    // AREA[section] = `${calculationString} = ${result}`;
    AREA[section] = result;
  });
}

function calculateWallsAndDoorsAndWindowsSensibleHeatGain() {
  let sections = ["north", "south", "east", "west"];

  sections.forEach((section) => {
    // WALLS
    SENSIBLE_HEAT_GAIN.walls[section] =
      HEAT_COEFFICIENT.walls[section] *
      AREA.walls[section] *
      EQUIVALENT_TEMPERATURE_DIFF.walls[section];

    // DOORS
    SENSIBLE_HEAT_GAIN.doors[section] =
      HEAT_COEFFICIENT.doors[section] *
      AREA.doors[section] *
      EQUIVALENT_TEMPERATURE_DIFF.doors[section];

    // WINDOWS
    SENSIBLE_HEAT_GAIN.windows[section] =
      HEAT_COEFFICIENT.windows[section] *
      AREA.windows[section] *
      EQUIVALENT_TEMPERATURE_DIFF.windows[section];
  });
}

function calculateRoofAndFloorSensibleHeatGain() {
  let sections = ["roof", "floor"];

  sections.forEach((section) => {
    SENSIBLE_HEAT_GAIN[section] =
      HEAT_COEFFICIENT[section] *
      AREA[section] *
      EQUIVALENT_TEMPERATURE_DIFF[section];
  });
}

function calculateTotalSensibleHeatGain() {
  $("#totalOfTotalSensibleHeatGain").html(sumOfValues(SENSIBLE_HEAT_GAIN));
}

function sumOfValues(obj) {
  let sum = 0;
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      sum += sumOfValues(obj[key]);
    } else {
      sum += obj[key];
    }
  }
  return sum;
}

function updateAllFieldValues() {
  // Update room values
  room.length = parseFloat($("#roomLength").val()) || 0;
  room.width = parseFloat($("#roomWidth").val()) || 0;
  room.height = parseFloat($("#roomHeight").val()) || 0;

  // Update door values
  doors.length = parseFloat($("#doorLength").val()) || 0;
  doors.width = parseFloat($("#doorWidth").val()) || 0;

  doors.north = parseInt($("#doorsCountNorth").val()) || 0;
  doors.south = parseInt($("#doorsCountSouth").val()) || 0;
  doors.east = parseInt($("#doorsCountEast").val()) || 0;
  doors.west = parseInt($("#doorsCountWest").val()) || 0;
  doors.area = doors.length * doors.width;

  // Update window values
  windows.length = parseFloat($("#windowsLength").val()) || 0;
  windows.width = parseFloat($("#windowsWidth").val()) || 0;

  windows.north = parseInt($("#windowsCountNorth").val()) || 0;
  windows.south = parseInt($("#windowsCountSouth").val()) || 0;
  windows.east = parseInt($("#windowsCountEast").val()) || 0;
  windows.west = parseInt($("#windowsCountWest").val()) || 0;
  windows.area = windows.length * windows.width;

  // Update Heat coefficient values
  HEAT_COEFFICIENT.walls.north =
    parseFloat($("#heatCoefficientNorthWall").val()) || 0;
  HEAT_COEFFICIENT.walls.south =
    parseFloat($("#heatCoefficientSouthWall").val()) || 0;
  HEAT_COEFFICIENT.walls.east =
    parseFloat($("#heatCoefficientEastWall").val()) || 0;
  HEAT_COEFFICIENT.walls.west =
    parseFloat($("#heatCoefficientWestWall").val()) || 0;
  HEAT_COEFFICIENT.roof = parseFloat($("#heatCoefficientRoof").val()) || 0;
  HEAT_COEFFICIENT.floor = parseFloat($("#heatCoefficientFloor").val()) || 0;
  HEAT_COEFFICIENT.doors.north =
    parseFloat($("#heatCoefficientNorthDoors").val()) || 0;
  HEAT_COEFFICIENT.doors.south =
    parseFloat($("#heatCoefficientSouthDoors").val()) || 0;
  HEAT_COEFFICIENT.doors.east =
    parseFloat($("#heatCoefficientEastDoors").val()) || 0;
  HEAT_COEFFICIENT.doors.west =
    parseFloat($("#heatCoefficientWestDoors").val()) || 0;
  HEAT_COEFFICIENT.windows.north =
    parseFloat($("#heatCoefficientNorthWindows").val()) || 0;
  HEAT_COEFFICIENT.windows.south =
    parseFloat($("#heatCoefficientSouthWindows").val()) || 0;
  HEAT_COEFFICIENT.windows.east =
    parseFloat($("#heatCoefficientEastWindows").val()) || 0;
  HEAT_COEFFICIENT.windows.west =
    parseFloat($("#heatCoefficientWestWindows").val()) || 0;

  // Update temperature coefficient
  EQUIVALENT_TEMPERATURE_DIFF.walls.north =
    parseFloat($("#eqTemperatureDifferenceNorthWall").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.walls.south =
    parseFloat($("#eqTemperatureDifferenceSouthWall").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.walls.east =
    parseFloat($("#eqTemperatureDifferenceEastWall").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.walls.west =
    parseFloat($("#eqTemperatureDifferenceWestWall").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.doors.north =
    parseFloat($("#eqTemperatureDifferenceNorthDoors").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.doors.south =
    parseFloat($("#eqTemperatureDifferenceSouthDoors").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.doors.east =
    parseFloat($("#eqTemperatureDifferenceEastDoors").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.doors.west =
    parseFloat($("#eqTemperatureDifferenceWestDoors").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.windows.north =
    parseFloat($("#eqTemperatureDifferenceNorthWindows").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.windows.south =
    parseFloat($("#eqTemperatureDifferenceSouthWindows").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.windows.east =
    parseFloat($("#eqTemperatureDifferenceEastWindows").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.windows.west =
    parseFloat($("#eqTemperatureDifferenceWestWindows").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.roof =
    parseFloat($("#eqTemperatureDifferenceRoof").val()) || 0;
  EQUIVALENT_TEMPERATURE_DIFF.floor =
    parseFloat($("#eqTemperatureDifferenceFloor").val()) || 0;

  // Log updated values
  //   console.log(room);
  //   console.log(doors);
  //   console.log(windows);
}

function updateValuesInDisplay() {
  // UPDATE WALLS DISPLAY
  $("#northWallAreaTotal").html(AREA.walls.north);
  $("#southWallAreaTotal").html(AREA.walls.south);
  $("#eastWallAreaTotal").html(AREA.walls.east);
  $("#westWallAreaTotal").html(AREA.walls.west);
  $("#northWallSensibleHeat").html(SENSIBLE_HEAT_GAIN.walls.north);
  $("#southWallSensibleHeat").html(SENSIBLE_HEAT_GAIN.walls.south);
  $("#eastWallSensibleHeat").html(SENSIBLE_HEAT_GAIN.walls.east);
  $("#westWallSensibleHeat").html(SENSIBLE_HEAT_GAIN.walls.west);

  // UPDATE ROOF & FLOOR
  $("#roofAreaTotal").html(AREA.roof);
  $("#floorAreaTotal").html(AREA.floor);
  $("#roofSensibleHeat").html(SENSIBLE_HEAT_GAIN.roof);
  $("#floorSensibleHeat").html(SENSIBLE_HEAT_GAIN.floor);

  // UPDATE DOORS
  $("#northDoorsAreaTotal").html(AREA.doors.north);
  $("#southDoorsAreaTotal").html(AREA.doors.south);
  $("#eastDoorsAreaTotal").html(AREA.doors.east);
  $("#westDoorsAreaTotal").html(AREA.doors.west);
  $("#northDoorsSensibleHeat").html(SENSIBLE_HEAT_GAIN.doors.north);
  $("#southDoorsSensibleHeat").html(SENSIBLE_HEAT_GAIN.doors.south);
  $("#eastDoorsSensibleHeat").html(SENSIBLE_HEAT_GAIN.doors.east);
  $("#westDoorsSensibleHeat").html(SENSIBLE_HEAT_GAIN.doors.west);

  // UPDATE WINDOWS
  $("#northWindowsAreaTotal").html(AREA.windows.north);
  $("#southWindowsAreaTotal").html(AREA.windows.south);
  $("#eastWindowsAreaTotal").html(AREA.windows.east);
  $("#westWindowsAreaTotal").html(AREA.windows.west);
  $("#northWindowsSensibleHeat").html(SENSIBLE_HEAT_GAIN.windows.north);
  $("#southWindowsSensibleHeat").html(SENSIBLE_HEAT_GAIN.windows.south);
  $("#eastWindowsSensibleHeat").html(SENSIBLE_HEAT_GAIN.windows.east);
  $("#westWindowsSensibleHeat").html(SENSIBLE_HEAT_GAIN.windows.west);
}
