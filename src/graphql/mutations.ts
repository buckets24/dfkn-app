/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAgentModel = /* GraphQL */ `
  mutation CreateAgentModel(
    $input: CreateAgentModelInput!
    $condition: ModelAgentModelConditionInput
  ) {
    createAgentModel(input: $input, condition: $condition) {
      id
      sub
      firstName
      lastName
      salutation
      email
      phone
      streetHouseNumber
      postCode
      place
      role
      subsidiary
      active
      cognitoStatus
      status
      owner
      createdAt
      updatedAt
      meetingsAsModerator {
        nextToken
      }
    }
  }
`;
export const updateAgentModel = /* GraphQL */ `
  mutation UpdateAgentModel(
    $input: UpdateAgentModelInput!
    $condition: ModelAgentModelConditionInput
  ) {
    updateAgentModel(input: $input, condition: $condition) {
      id
      sub
      firstName
      lastName
      salutation
      email
      phone
      streetHouseNumber
      postCode
      place
      role
      subsidiary
      active
      cognitoStatus
      status
      owner
      createdAt
      updatedAt
      meetingsAsModerator {
        nextToken
      }
    }
  }
`;
export const deleteAgentModel = /* GraphQL */ `
  mutation DeleteAgentModel(
    $input: DeleteAgentModelInput!
    $condition: ModelAgentModelConditionInput
  ) {
    deleteAgentModel(input: $input, condition: $condition) {
      id
      sub
      firstName
      lastName
      salutation
      email
      phone
      streetHouseNumber
      postCode
      place
      role
      subsidiary
      active
      cognitoStatus
      status
      owner
      createdAt
      updatedAt
      meetingsAsModerator {
        nextToken
      }
    }
  }
`;
export const createClientModel = /* GraphQL */ `
  mutation CreateClientModel(
    $input: CreateClientModelInput!
    $condition: ModelClientModelConditionInput
  ) {
    createClientModel(input: $input, condition: $condition) {
      id
      sub
      firstName
      lastName
      salutation
      email
      telephone
      fax
      mobile
      maritalStatus
      country
      streetHouseNumber
      postCode
      place
      addressValidDate
      birthPlace
      birthday
      title
      nationality
      taxId
      emailVerified
      active
      contractor {
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
      }
      subsidiary
      cognitoStatus
      status
      owner
      editors
      productInfoImmposparen {
        oneTimeInvestment
        proportionalInvestment
      }
      createdAt
      updatedAt
      meetings {
        nextToken
      }
      onlineDocuments {
        nextToken
      }
      agentDocuments {
        nextToken
      }
    }
  }
`;
export const deleteClientModel = /* GraphQL */ `
  mutation DeleteClientModel(
    $input: DeleteClientModelInput!
    $condition: ModelClientModelConditionInput
  ) {
    deleteClientModel(input: $input, condition: $condition) {
      id
      sub
      firstName
      lastName
      salutation
      email
      telephone
      fax
      mobile
      maritalStatus
      country
      streetHouseNumber
      postCode
      place
      addressValidDate
      birthPlace
      birthday
      title
      nationality
      taxId
      emailVerified
      active
      contractor {
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
      }
      subsidiary
      cognitoStatus
      status
      owner
      editors
      productInfoImmposparen {
        oneTimeInvestment
        proportionalInvestment
      }
      createdAt
      updatedAt
      meetings {
        nextToken
      }
      onlineDocuments {
        nextToken
      }
      agentDocuments {
        nextToken
      }
    }
  }
`;
export const createClientActivityModel = /* GraphQL */ `
  mutation CreateClientActivityModel(
    $input: CreateClientActivityModelInput!
    $condition: ModelClientActivityModelConditionInput
  ) {
    createClientActivityModel(input: $input, condition: $condition) {
      id
      clientId
      dueDate
      description
      done
      priority
      editors
      createdAt
      owner
      updatedBy
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateClientActivityModel = /* GraphQL */ `
  mutation UpdateClientActivityModel(
    $input: UpdateClientActivityModelInput!
    $condition: ModelClientActivityModelConditionInput
  ) {
    updateClientActivityModel(input: $input, condition: $condition) {
      id
      clientId
      dueDate
      description
      done
      priority
      editors
      createdAt
      owner
      updatedBy
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteClientActivityModel = /* GraphQL */ `
  mutation DeleteClientActivityModel(
    $input: DeleteClientActivityModelInput!
    $condition: ModelClientActivityModelConditionInput
  ) {
    deleteClientActivityModel(input: $input, condition: $condition) {
      id
      clientId
      dueDate
      description
      done
      priority
      editors
      createdAt
      owner
      updatedBy
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const createMeetingModel = /* GraphQL */ `
  mutation CreateMeetingModel(
    $input: CreateMeetingModelInput!
    $condition: ModelMeetingModelConditionInput
  ) {
    createMeetingModel(input: $input, condition: $condition) {
      id
      owner
      meetingDateTime
      moderatorId
      moderatorName
      clientId
      editors
      activeDocumentId
      scrollPos
      scrollPosPercent
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      guestAgents {
        nextToken
      }
    }
  }
`;
export const updateMeetingModel = /* GraphQL */ `
  mutation UpdateMeetingModel(
    $input: UpdateMeetingModelInput!
    $condition: ModelMeetingModelConditionInput
  ) {
    updateMeetingModel(input: $input, condition: $condition) {
      id
      owner
      meetingDateTime
      moderatorId
      moderatorName
      clientId
      editors
      activeDocumentId
      scrollPos
      scrollPosPercent
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      guestAgents {
        nextToken
      }
    }
  }
`;
export const deleteMeetingModel = /* GraphQL */ `
  mutation DeleteMeetingModel(
    $input: DeleteMeetingModelInput!
    $condition: ModelMeetingModelConditionInput
  ) {
    deleteMeetingModel(input: $input, condition: $condition) {
      id
      owner
      meetingDateTime
      moderatorId
      moderatorName
      clientId
      editors
      activeDocumentId
      scrollPos
      scrollPosPercent
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      guestAgents {
        nextToken
      }
    }
  }
`;
export const createGuestAgentMeetingModel = /* GraphQL */ `
  mutation CreateGuestAgentMeetingModel(
    $input: CreateGuestAgentMeetingModelInput!
    $condition: ModelGuestAgentMeetingModelConditionInput
  ) {
    createGuestAgentMeetingModel(input: $input, condition: $condition) {
      id
      meetingId
      agentId
      createdAt
      updatedAt
    }
  }
`;
export const updateGuestAgentMeetingModel = /* GraphQL */ `
  mutation UpdateGuestAgentMeetingModel(
    $input: UpdateGuestAgentMeetingModelInput!
    $condition: ModelGuestAgentMeetingModelConditionInput
  ) {
    updateGuestAgentMeetingModel(input: $input, condition: $condition) {
      id
      meetingId
      agentId
      createdAt
      updatedAt
    }
  }
`;
export const deleteGuestAgentMeetingModel = /* GraphQL */ `
  mutation DeleteGuestAgentMeetingModel(
    $input: DeleteGuestAgentMeetingModelInput!
    $condition: ModelGuestAgentMeetingModelConditionInput
  ) {
    deleteGuestAgentMeetingModel(input: $input, condition: $condition) {
      id
      meetingId
      agentId
      createdAt
      updatedAt
    }
  }
`;
export const createOnlineDocumentModel = /* GraphQL */ `
  mutation CreateOnlineDocumentModel(
    $input: CreateOnlineDocumentModelInput!
    $condition: ModelOnlineDocumentModelConditionInput
  ) {
    createOnlineDocumentModel(input: $input, condition: $condition) {
      id
      title
      type
      status
      values
      clientId
      contractor
      owner
      editors
      isVisibleToClient
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      patches {
        nextToken
      }
    }
  }
`;
export const deleteOnlineDocumentModel = /* GraphQL */ `
  mutation DeleteOnlineDocumentModel(
    $input: DeleteOnlineDocumentModelInput!
    $condition: ModelOnlineDocumentModelConditionInput
  ) {
    deleteOnlineDocumentModel(input: $input, condition: $condition) {
      id
      title
      type
      status
      values
      clientId
      contractor
      owner
      editors
      isVisibleToClient
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      patches {
        nextToken
      }
    }
  }
`;
export const deleteDocumentPatch = /* GraphQL */ `
  mutation DeleteDocumentPatch(
    $input: DeleteDocumentPatchInput!
    $condition: ModelDocumentPatchConditionInput
  ) {
    deleteDocumentPatch(input: $input, condition: $condition) {
      id
      patch
      documentId
      uniqueEditorInstance
      author
      createdAt
      updatedAt
    }
  }
`;
export const createOnlineDocumentArchiveModel = /* GraphQL */ `
  mutation CreateOnlineDocumentArchiveModel(
    $input: CreateOnlineDocumentArchiveModelInput!
    $condition: ModelOnlineDocumentArchiveModelConditionInput
  ) {
    createOnlineDocumentArchiveModel(input: $input, condition: $condition) {
      id
      documentId
      title
      type
      values
      clientId
      contractor
      owner
      editors
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateOnlineDocumentArchiveModel = /* GraphQL */ `
  mutation UpdateOnlineDocumentArchiveModel(
    $input: UpdateOnlineDocumentArchiveModelInput!
    $condition: ModelOnlineDocumentArchiveModelConditionInput
  ) {
    updateOnlineDocumentArchiveModel(input: $input, condition: $condition) {
      id
      documentId
      title
      type
      values
      clientId
      contractor
      owner
      editors
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteOnlineDocumentArchiveModel = /* GraphQL */ `
  mutation DeleteOnlineDocumentArchiveModel(
    $input: DeleteOnlineDocumentArchiveModelInput!
    $condition: ModelOnlineDocumentArchiveModelConditionInput
  ) {
    deleteOnlineDocumentArchiveModel(input: $input, condition: $condition) {
      id
      documentId
      title
      type
      values
      clientId
      contractor
      owner
      editors
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const createSignatureTokenModel = /* GraphQL */ `
  mutation CreateSignatureTokenModel(
    $input: CreateSignatureTokenModelInput!
    $condition: ModelSignatureTokenModelConditionInput
  ) {
    createSignatureTokenModel(input: $input, condition: $condition) {
      id
      pin
      documentId
      fieldName
      authorId
      createdAt
      updatedAt
    }
  }
`;
export const updateClientModel = /* GraphQL */ `
  mutation UpdateClientModel(
    $input: UpdateClientModelInput!
    $condition: ModelClientModelConditionInput
  ) {
    updateClientModel(input: $input, condition: $condition) {
      id
      sub
      firstName
      lastName
      salutation
      email
      telephone
      fax
      mobile
      maritalStatus
      country
      streetHouseNumber
      postCode
      place
      addressValidDate
      birthPlace
      birthday
      title
      nationality
      taxId
      emailVerified
      active
      contractor {
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
      }
      subsidiary
      cognitoStatus
      status
      owner
      editors
      productInfoImmposparen {
        oneTimeInvestment
        proportionalInvestment
      }
      createdAt
      updatedAt
      meetings {
        nextToken
      }
      onlineDocuments {
        nextToken
      }
      agentDocuments {
        nextToken
      }
    }
  }
`;
export const updateOnlineDocumentModel = /* GraphQL */ `
  mutation UpdateOnlineDocumentModel(
    $input: UpdateOnlineDocumentModelInput!
    $condition: ModelOnlineDocumentModelConditionInput
  ) {
    updateOnlineDocumentModel(input: $input, condition: $condition) {
      id
      title
      type
      status
      values
      clientId
      contractor
      owner
      editors
      isVisibleToClient
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      patches {
        nextToken
      }
    }
  }
`;
export const createDocumentPatch = /* GraphQL */ `
  mutation CreateDocumentPatch(
    $input: CreateDocumentPatchInput!
    $condition: ModelDocumentPatchConditionInput
  ) {
    createDocumentPatch(input: $input, condition: $condition) {
      id
      patch
      documentId
      uniqueEditorInstance
      author
      createdAt
      updatedAt
    }
  }
`;
export const updateDocumentPatch = /* GraphQL */ `
  mutation UpdateDocumentPatch(
    $input: UpdateDocumentPatchInput!
    $condition: ModelDocumentPatchConditionInput
  ) {
    updateDocumentPatch(input: $input, condition: $condition) {
      id
      patch
      documentId
      uniqueEditorInstance
      author
      createdAt
      updatedAt
    }
  }
`;
export const updateSignatureTokenModel = /* GraphQL */ `
  mutation UpdateSignatureTokenModel(
    $input: UpdateSignatureTokenModelInput!
    $condition: ModelSignatureTokenModelConditionInput
  ) {
    updateSignatureTokenModel(input: $input, condition: $condition) {
      id
      pin
      documentId
      fieldName
      authorId
      createdAt
      updatedAt
    }
  }
`;
export const deleteSignatureTokenModel = /* GraphQL */ `
  mutation DeleteSignatureTokenModel(
    $input: DeleteSignatureTokenModelInput!
    $condition: ModelSignatureTokenModelConditionInput
  ) {
    deleteSignatureTokenModel(input: $input, condition: $condition) {
      id
      pin
      documentId
      fieldName
      authorId
      createdAt
      updatedAt
    }
  }
`;
