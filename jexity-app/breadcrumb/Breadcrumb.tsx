import { FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, useMultiStyleConfig, BoxProps } from '@chakra-ui/react';

export const JexityBreadcrumb: FC<BoxProps> = ({ ...other }) => {
  const router = useRouter();
  const styles = useMultiStyleConfig('Breadcrumb', {});
  const urlArr = router.asPath.split('/').slice(2, router.asPath.split('/').length);

  return (
    <Breadcrumb {...other}>
      {urlArr.map((url, i) => (
        <BreadcrumbItem key={i}>
          <NextLink href={`${router.asPath.slice(0, router.asPath.indexOf(`${url}`))}${url}`} passHref>
            <BreadcrumbLink
              sx={{ ...styles.breadcrumbLink, color: urlArr[urlArr.length - 1] === url ? 'gray.600' : 'initial' }}
            >
              {url}
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
