import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import {
  ContractorInput,
  ContractorType,
  UpdateClientModelMutation,
  UpdateClientModelMutationVariables,
} from 'src/API';
import { updateClientModel } from 'src/graphql/mutations';
import { UseDocumentByIdQueryValue } from '../../query-hooks/useDocumentByIdQuery';
import patcher from '../../utils/patcher';

const syncClientInfo = async (
  contractorType: ContractorType,
  clientInfo: NonNullable<UseDocumentByIdQueryValue>['client'],
  patchedValue: ReturnType<typeof patcher>
): Promise<void> => {
  let updateInfo: UpdateClientModelMutationVariables['input'];

  try {
    const { createdAt, updatedAt, ...otherInfo } = clientInfo;

    if (contractorType === ContractorType.SECONDARY) {
      const { title, firstName, lastName, maritalStatus, birthPlace, birthday, taxId, nationality } = patchedValue;
      const c: ContractorInput = {};
      if (title) c.title = title;
      if (firstName) c.firstName = firstName;
      if (lastName) c.lastName = lastName;
      if (maritalStatus) c.maritalStatus = maritalStatus;
      if (birthPlace) c.birthPlace = birthPlace;
      if (birthday) c.birthday = birthday;
      if (taxId) c.taxId = taxId;
      if (nationality) c.nationality = nationality;

      updateInfo = {
        ...otherInfo,
        id: clientInfo.id,
        contractor: {
          ...otherInfo.contractor,
          ...c,
        },
      };
    } else {
      const {
        contractorTitle,
        contractorFirstName,
        contractorLastName,
        contractorMaritalStatus,
        contractorBirthPlace,
        contractorBirthDate,
        contractorTaxID,
        contractorNationality,
      } = patchedValue;
      const c: ContractorInput = {};

      if (contractorTitle) c.title = contractorTitle;
      if (contractorFirstName) c.firstName = contractorFirstName;
      if (contractorLastName) c.lastName = contractorLastName;
      if (contractorMaritalStatus) c.maritalStatus = contractorMaritalStatus;
      if (contractorBirthPlace) c.birthPlace = contractorBirthPlace;
      if (contractorBirthDate) c.birthday = contractorBirthDate;
      if (contractorTaxID) c.taxId = contractorTaxID;
      if (contractorNationality) c.nationality = contractorNationality;

      updateInfo = {
        ...otherInfo,
        title: patchedValue.title,
        salutation: patchedValue.salutation,
        firstName: patchedValue.firstName,
        lastName: patchedValue.lastName,
        maritalStatus: patchedValue.maritalStatus,
        birthPlace: patchedValue.birthPlace,
        birthday: patchedValue.birthday,
        taxId: patchedValue.taxId,
        telephone: patchedValue.telephone,
        fax: patchedValue.fax,
        mobile: patchedValue.mobile,
        postCode: patchedValue.postCode,
        place: patchedValue.place,
        streetHouseNumber: patchedValue.streetHouseNumber,
        country: patchedValue.country,
        addressValidDate: patchedValue.addressValidDate,
        nationality: patchedValue.nationality,
        contractor: {
          ...otherInfo.contractor,
          ...c,
        },
      };
    }

    const variables: UpdateClientModelMutationVariables = {
      input: {
        ...updateInfo,
      },
    };
    (await API.graphql({ query: updateClientModel, variables })) as GraphQLResult<UpdateClientModelMutation>;
  } catch (e) {
    log(LogLevel.error, e, { label: 'syncClientInfo', ...e });
  }
};

export default syncClientInfo;
