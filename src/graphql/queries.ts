/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClientActivityModel = /* GraphQL */ `
  query GetClientActivityModel($id: ID!) {
    getClientActivityModel(id: $id) {
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
export const listClientActivityModels = /* GraphQL */ `
  query ListClientActivityModels(
    $filter: ModelClientActivityModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClientActivityModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getActivitiesByOwnerSortedByCreatedAt = /* GraphQL */ `
  query GetActivitiesByOwnerSortedByCreatedAt(
    $owner: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelClientActivityModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getActivitiesByOwnerSortedByCreatedAt(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getActivitiesByClientIdSortedByCreatedAt = /* GraphQL */ `
  query GetActivitiesByClientIdSortedByCreatedAt(
    $clientId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelClientActivityModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getActivitiesByClientIdSortedByCreatedAt(
      clientId: $clientId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getAgentModel = /* GraphQL */ `
  query GetAgentModel($id: ID!) {
    getAgentModel(id: $id) {
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
export const listAgentModels = /* GraphQL */ `
  query ListAgentModels(
    $filter: ModelAgentModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgentModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getAgentBySub = /* GraphQL */ `
  query GetAgentBySub(
    $sub: String
    $sortDirection: ModelSortDirection
    $filter: ModelAgentModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getAgentBySub(
      sub: $sub
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getAgentByEmail = /* GraphQL */ `
  query GetAgentByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelAgentModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getAgentByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const listClientModels = /* GraphQL */ `
  query ListClientModels(
    $filter: ModelClientModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClientModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getClientModel = /* GraphQL */ `
  query GetClientModel($id: ID!) {
    getClientModel(id: $id) {
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
export const getClientBySub = /* GraphQL */ `
  query GetClientBySub(
    $sub: String
    $sortDirection: ModelSortDirection
    $filter: ModelClientModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getClientBySub(
      sub: $sub
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getClientsByOwner = /* GraphQL */ `
  query GetClientsByOwner(
    $owner: String
    $lastName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelClientModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getClientsByOwner(
      owner: $owner
      lastName: $lastName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getClientByEmail = /* GraphQL */ `
  query GetClientByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelClientModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getClientByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getMeetingModel = /* GraphQL */ `
  query GetMeetingModel($id: ID!) {
    getMeetingModel(id: $id) {
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
export const listMeetingModels = /* GraphQL */ `
  query ListMeetingModels(
    $filter: ModelMeetingModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetingModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getMeetingsByOwner = /* GraphQL */ `
  query GetMeetingsByOwner(
    $owner: String
    $sortDirection: ModelSortDirection
    $filter: ModelMeetingModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getMeetingsByOwner(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getMeetingsByClientId = /* GraphQL */ `
  query GetMeetingsByClientId(
    $clientId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelMeetingModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getMeetingsByClientId(
      clientId: $clientId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getGuestAgentMeetingModel = /* GraphQL */ `
  query GetGuestAgentMeetingModel($id: ID!) {
    getGuestAgentMeetingModel(id: $id) {
      id
      meetingId
      agentId
      createdAt
      updatedAt
    }
  }
`;
export const listGuestAgentMeetingModels = /* GraphQL */ `
  query ListGuestAgentMeetingModels(
    $filter: ModelGuestAgentMeetingModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGuestAgentMeetingModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        meetingId
        agentId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOnlineDocumentModel = /* GraphQL */ `
  query GetOnlineDocumentModel($id: ID!) {
    getOnlineDocumentModel(id: $id) {
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
export const listOnlineDocumentModels = /* GraphQL */ `
  query ListOnlineDocumentModels(
    $filter: ModelOnlineDocumentModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOnlineDocumentModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getOnlineDocumentsByClientId = /* GraphQL */ `
  query GetOnlineDocumentsByClientId(
    $clientId: ID
    $version: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOnlineDocumentModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getOnlineDocumentsByClientId(
      clientId: $clientId
      version: $version
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getDocumentPatch = /* GraphQL */ `
  query GetDocumentPatch($id: ID!) {
    getDocumentPatch(id: $id) {
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
export const listDocumentPatchs = /* GraphQL */ `
  query ListDocumentPatchs(
    $filter: ModelDocumentPatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocumentPatchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        patch
        documentId
        uniqueEditorInstance
        author
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const patchesByDocumentId = /* GraphQL */ `
  query PatchesByDocumentId(
    $documentId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentPatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    patchesByDocumentId(
      documentId: $documentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        patch
        documentId
        uniqueEditorInstance
        author
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLatestPatchByDocumentId = /* GraphQL */ `
  query GetLatestPatchByDocumentId(
    $documentId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentPatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getLatestPatchByDocumentId(
      documentId: $documentId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        patch
        documentId
        uniqueEditorInstance
        author
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOnlineDocumentArchiveModel = /* GraphQL */ `
  query GetOnlineDocumentArchiveModel($id: ID!) {
    getOnlineDocumentArchiveModel(id: $id) {
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
export const listOnlineDocumentArchiveModels = /* GraphQL */ `
  query ListOnlineDocumentArchiveModels(
    $filter: ModelOnlineDocumentArchiveModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOnlineDocumentArchiveModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getOnlineDocumentsArchiveByClientId = /* GraphQL */ `
  query GetOnlineDocumentsArchiveByClientId(
    $clientId: ID
    $version: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOnlineDocumentArchiveModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getOnlineDocumentsArchiveByClientId(
      clientId: $clientId
      version: $version
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getSignatureTokenModel = /* GraphQL */ `
  query GetSignatureTokenModel($id: ID!) {
    getSignatureTokenModel(id: $id) {
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
export const listSignatureTokenModels = /* GraphQL */ `
  query ListSignatureTokenModels(
    $filter: ModelSignatureTokenModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSignatureTokenModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pin
        documentId
        fieldName
        authorId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSignatureTokenByDocumentId = /* GraphQL */ `
  query GetSignatureTokenByDocumentId(
    $documentId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelSignatureTokenModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getSignatureTokenByDocumentId(
      documentId: $documentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pin
        documentId
        fieldName
        authorId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
