import { fetchUtil } from '../../common/utils'
import { Project } from './types'
/**
 * TEMP - This is a temporary implementation of data ingress
 *
 * In this file we fetch all user git repos. Once fetched we
 * then format the data and cache it. This will be refactored
 * once the sql server is made along with its fetch process.
 */

export async function fetchUserData(): Promise<unknown> {
  const gitUser: string = process.env.GIT_USER_NAME || 'JakeSquier'
  const gitApiUrl: string = `https://api.github.com/users/${gitUser}/repos`

  const unsanitizedData = await fetchUtil(gitApiUrl, 'GET')

  //@ts-ignore
  const sanitizedData: Project[] = unsanitizedData.map((repo: unknown) => {
    return {
      //@ts-ignore
      id: repo.id,
      //@ts-ignore
      name: repo.name,
      //@ts-ignore
      fullName: repo.full_name,
      //@ts-ignore
      ownerUserName: repo.owner.login,
      //@ts-ignore
      ownerId: repo.owner.id,
      //@ts-ignore
      ownerAvatar: repo.owner.avatar_url,
      //@ts-ignore
      ownerUrl: repo.owner.url,
      //@ts-ignore
      description: repo.description,
      //@ts-ignore
      repoUrl: repo.url,
      //@ts-ignore
      repoSize: repo.size,
      //@ts-ignore
      primaryLanguage: repo.language ? repo.language : null,
    }
  })

  return sanitizedData
}
