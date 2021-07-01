export const listMeetingModelsWithClientNames = /* GraphQL */ `
  query ListMeetingModelsWithClientNames($filter: ModelMeetingModelFilterInput, $limit: Int, $nextToken: String) {
    listMeetingModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        meetingDateTime
        moderatorId
        clientId
        createdAt
        updatedAt
        client {
          title
          firstName
          lastName
        }
        activeDocumentId
        scrollPos
      }
      nextToken
    }
  }
`;

export const getMeetingsByOwnerWithClientNames = /* GraphQL */ `
  query GetMeetingsByOwnerWithClientNames(
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
        client {
          salutation
          title
          firstName
          lastName
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getAgentModelWithMeetings = /* GraphQL */ `
  query GetAgentModelWithMeetings($id: ID!) {
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
      createdAt
      updatedAt
      meetingsAsModerator {
        items {
          id
          owner
          meetingDateTime
          moderatorId
          clientId
          activeDocumentId
          scrollPos
          scrollPosPercent
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const getClientBySubWithMeetingIds = /* GraphQL */ `
  query GetClientBySubWithMeetingIds(
    $sub: String
    $sortDirection: ModelSortDirection
    $filter: ModelClientModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getClientBySub(sub: $sub, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        owner
        editors
        createdAt
        updatedAt
        meetings {
          items {
            id
          }
        }
      }
      nextToken
    }
  }
`;
export const getMeetingsByClientIdWithClientName = /* GraphQL */ `
  query GetMeetingsByClientIdWithClientName(
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
        clientId
        editors
        activeDocumentId
        scrollPos
        scrollPosPercent
        createdAt
        updatedAt
        client {
          title
          firstName
          lastName
        }
      }
      nextToken
    }
  }
`;

export const getOnlineDocumentModelWithPatches = /* GraphQL */ `
  query GetOnlineDocumentModelWithPatches($id: ID!, $nextToken: String, $limit: Int) {
    getOnlineDocumentModel(id: $id) {
      id
      title
      type
      status
      values
      clientId
      version
      owner
      editors
      isVisibleToClient
      createdAt
      updatedAt
      contractor
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
        owner
        editors
        createdAt
        updatedAt
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
      }
      patches(nextToken: $nextToken, limit: $limit) {
        nextToken
        items {
          id
          patch
          documentId
          uniqueEditorInstance
          author
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const getOnlineDocumentsWithPatchesByClientId = /* GraphQL */ `
  query GetOnlineDocumentsWithPatchesByClientId(
    $clientId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelOnlineDocumentModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getOnlineDocumentsByClientId(
      clientId: $clientId
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
        owner
        editors
        isVisibleToClient
        createdAt
        updatedAt
        version
        contractor
        patches {
          nextToken
          items {
            id
            patch
            documentId
            uniqueEditorInstance
            author
            createdAt
            updatedAt
          }
        }
      }
      nextToken
    }
  }
`;

export const getOnlineDocumentsWithLatestPatchByClientId = /* GraphQL */ `
  query GetOnlineDocumentsWithLatestPatchByClientId(
    $clientId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelOnlineDocumentModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getOnlineDocumentsByClientId(
      clientId: $clientId
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
        owner
        editors
        isVisibleToClient
        createdAt
        updatedAt
        version
        contractor
        patches(limit: 1, sortDirection: DESC) {
          nextToken
          items {
            id
            patch
            documentId
            uniqueEditorInstance
            author
            createdAt
            updatedAt
          }
        }
      }
      nextToken
    }
  }
`;

/**
 * The default generated subscriptions
 * no longer work for somereason
 */
export const onAgentCreate = /* GraphQL */ `
  subscription OnAgentCreate {
    onCreateAgentModel {
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
      status
      cognitoStatus
      owner
      createdAt
      updatedAt
    }
  }
`;

export const onAgentUpdate = /* GraphQL */ `
  subscription OnAgentUpdate {
    onUpdateAgentModel {
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
      status
      cognitoStatus
      owner
      createdAt
      updatedAt
    }
  }
`;

export const onAgentDelete = /* GraphQL */ `
  subscription OnAgentDelete {
    onDeleteAgentModel {
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
      status
      cognitoStatus
      owner
      createdAt
      updatedAt
    }
  }
`;
