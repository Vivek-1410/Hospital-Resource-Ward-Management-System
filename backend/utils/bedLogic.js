function canAssignBed(bed, patient) {
  if (!bed) return { allowed: false, reason: "Bed not found" };

  if (bed.isOccupied) {
    return { allowed: false, reason: "Bed already occupied" };
  }

  if (!patient) {
    return { allowed: false, reason: "Patient not found" };
  }

  return { allowed: true };
}

module.exports = { canAssignBed };