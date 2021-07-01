import { FC } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const SignInWithFingerIcon: FC<Omit<IconProps, 'children' | 'css'>> = (props) => (
  <Icon viewBox="0 0 26 38" w="26px" h="38px" {...props}>
    <path
      d="M25.0472 27.4056C25.0472 25.6032 23.583 24.1341 21.7833 24.1341C21.6365 24.1341 21.4902 24.144 21.3455 24.1631C20.747 23.4692 19.8635 23.0296 18.8798 23.0296C18.8353 23.0296 18.7916 23.0327 18.7474 23.0345V3.00637C18.7474 1.34866 17.4033 0 15.7512 0H3.38977C1.73764 0 0.393524 1.34866 0.393524 3.00637V29.3651C0.393524 31.0228 1.73764 32.3715 3.38977 32.3715H8.57497C8.8627 33.2571 9.32413 34.126 10.0555 34.8809C11.5602 36.4337 13.8422 37.1885 17.032 37.1885C18.5164 37.1885 19.8287 36.9526 20.9323 36.4871C21.9965 36.0383 22.8781 35.3768 23.5524 34.5209C24.5329 33.2764 25.0511 31.6244 25.0511 29.7432L25.0472 27.4056ZM3.38977 2.00425H15.7513C16.302 2.00425 16.75 2.4538 16.75 3.00637V3.83523H2.39102V3.00637C2.39102 2.4538 2.83916 2.00425 3.38977 2.00425ZM3.38977 30.3672C2.83906 30.3672 2.39102 29.9177 2.39102 29.3651V28.5364H8.13721C8.13622 28.5593 8.13372 28.5814 8.13312 28.6045C8.11834 29.1343 8.12084 29.7352 8.17876 30.3672H3.38977ZM9.75958 19.4028V25.8332C9.45207 26.017 9.16922 26.2523 8.92762 26.5322H2.39102V5.83947H16.75V22.0756C16.5952 22.0363 16.4362 22.0079 16.2737 21.9919L16.2747 20.5497L16.2754 19.6043C16.2755 19.4427 16.2755 19.3244 16.2743 19.2325H16.2755C16.2755 18.357 15.8776 17.516 15.1837 16.9254C14.5798 16.4113 13.8125 16.1282 13.0234 16.1282C11.2237 16.1281 9.75958 17.5972 9.75958 19.4028ZM17.032 35.1843C10.8582 35.1843 10.0349 32.0441 10.1299 28.6605C10.1527 27.8443 10.852 27.3625 11.4237 27.3625V28.859C11.4237 29.0475 11.5537 29.0693 11.5924 29.0693C11.631 29.0693 11.757 29.0479 11.757 28.8594C11.757 28.6778 11.757 19.4029 11.757 19.4029C11.757 18.7012 12.324 18.1324 13.0234 18.1324C13.6651 18.1324 14.2779 18.6222 14.2779 19.2326C14.2784 19.2348 14.2746 23.8982 14.2738 25.0456C14.2738 25.0479 14.2733 25.0503 14.2733 25.0524V25.2922C14.2733 25.4065 14.3655 25.499 14.4794 25.499C14.5931 25.499 14.6856 25.4064 14.6856 25.2922V25.2304C14.6969 24.5381 15.259 23.9804 15.9516 23.9804C16.651 23.9804 17.218 24.5494 17.218 25.2513L17.2188 26.1714C17.2188 26.284 17.3097 26.375 17.4219 26.375C17.5341 26.375 17.625 26.284 17.625 26.1714L17.6245 26.1188C17.6245 25.48 18.2433 25.0341 18.8798 25.0341C19.5792 25.0341 20.1436 25.6029 20.1436 26.3046L20.1461 27.2361C20.1461 27.3453 20.2344 27.4343 20.3436 27.4343C20.4529 27.4343 20.5413 27.3452 20.5413 27.2361L20.5405 27.1651C20.5405 26.5839 21.1671 26.1387 21.7832 26.1387C22.4826 26.1387 23.0496 26.7077 23.0496 27.4092L23.0535 29.7436C23.0536 31.9145 22.2123 35.1843 17.032 35.1843Z"
      fill="#CFA571"
    />
    <path
      d="M8.58396 13.1831L7.84038 13.4332C8.08803 13.0433 8.17233 12.5747 8.07643 12.1211C7.98053 11.6675 7.7115 11.2623 7.32313 10.9867C6.93475 10.711 6.45563 10.585 5.98157 10.6341C5.50751 10.6831 5.07342 10.9034 4.76609 11.251L2.9588 13.2918C2.91289 13.3437 2.87819 13.404 2.85668 13.4693C2.83517 13.5345 2.82726 13.6035 2.83342 13.6722C2.84585 13.811 2.91478 13.9404 3.02506 14.0318C3.13534 14.1233 3.27794 14.1694 3.42147 14.16C3.49254 14.1554 3.5617 14.1372 3.62501 14.1066C3.68831 14.076 3.74452 14.0336 3.79043 13.9817L5.59772 11.9409C5.7298 11.7923 5.91618 11.6984 6.11944 11.6783C6.32269 11.6581 6.52776 11.7131 6.69345 11.8322C6.85914 11.9513 6.97318 12.1257 7.01267 12.3204C7.05215 12.5151 7.01415 12.7155 6.9063 12.8816L6.08144 14.1433C6.02211 14.2347 5.99409 14.3423 6.00127 14.4511C6.00846 14.5598 6.05049 14.6643 6.12154 14.7501C6.19258 14.8359 6.28911 14.8987 6.39774 14.9299C6.50637 14.961 6.6217 14.9588 6.72773 14.9238L8.95625 14.1732C9.03794 14.1457 9.12566 14.1377 9.21201 14.1498C9.29835 14.162 9.3808 14.1939 9.45239 14.243C9.52398 14.2921 9.58262 14.3569 9.62337 14.4318C9.66412 14.5068 9.68579 14.5898 9.68654 14.6739L9.69305 15.3477C9.69422 15.465 9.73605 15.5792 9.81186 15.6721C9.88766 15.765 9.99308 15.8313 10.1112 15.8604L12.7511 16.5205C12.8911 16.5555 13.0387 16.5357 13.1615 16.4653C13.2843 16.3949 13.3722 16.2797 13.4059 16.1452C13.4395 16.0106 13.4162 15.8676 13.341 15.7477C13.2657 15.6278 13.1448 15.5408 13.0048 15.5058L10.7773 14.9488L10.775 14.6846C10.7726 14.4325 10.7076 14.1835 10.5853 13.9586C10.463 13.7337 10.287 13.5395 10.0723 13.3923C9.85748 13.2451 9.61017 13.1493 9.35115 13.1129C9.09214 13.0764 8.82902 13.1005 8.58396 13.1831Z"
      fill="#CFA571"
    />
  </Icon>
);