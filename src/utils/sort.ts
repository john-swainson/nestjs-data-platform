import { SortField, SortOrder, UserRecord } from '../common';

export const sortRecords = (
  records: UserRecord[],
  field: SortField,
  order: SortOrder,
): UserRecord[] => {
  return records.sort((a, b) => {
    let value;
    switch (field) {
      case SortField.GENDER:
        value = a.gender.localeCompare(b.gender);
        break;
      case SortField.LAST_NAME:
        value = a.lastName.localeCompare(b.lastName);
        break;
      case SortField.DOB:
        value = a.dob.getTime() - b.dob.getTime();
        break;
    }
    if (order === SortOrder.DESC) {
      value = value * (-1);
    }
    return value;
  });
};
