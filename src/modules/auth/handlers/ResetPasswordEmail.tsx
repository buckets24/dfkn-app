import React, { ReactElement } from 'react';

const ResetPasswordEmail = (
  salutation: string | null,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  title?: string | null
): ReactElement => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: /* HTML */ `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html
            xmlns="http://www.w3.org/1999/xhtml"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"
          >
            <head>
              <meta charset="UTF-8" />
              <meta content="width=device-width, initial-scale=1" name="viewport" />
              <meta name="x-apple-disable-message-reformatting" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta content="telephone=no" name="format-detection" />
              <title>New email template 2021-02-24</title>
              <!--[if (mso 16)]>
                <style type="text/css">
                  a {
                    text-decoration: none;
                  }
                </style>
              <![endif]-->
              <!--[if gte mso 9
                ]><style>
                  sup {
                    font-size: 100% !important;
                  }
                </style><!
              [endif]-->
              <!--[if gte mso 9]>
                <xml>
                  <o:OfficeDocumentSettings>
                    <o:AllowPNG></o:AllowPNG>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                  </o:OfficeDocumentSettings>
                </xml>
              <![endif]-->
              <style type="text/css">
                #outlook a {
                  padding: 0;
                }
                .ExternalClass {
                  width: 100%;
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                  line-height: 100%;
                }
                .es-button {
                  mso-style-priority: 100 !important;
                  text-decoration: none !important;
                }
                a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: none !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                }
                .es-desk-hidden {
                  display: none;
                  float: left;
                  overflow: hidden;
                  width: 0;
                  max-height: 0;
                  line-height: 0;
                  mso-hide: all;
                }
                .es-button-border:hover {
                  background: #ffffff !important;
                  border-style: solid solid solid solid !important;
                  border-color: #3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3 !important;
                }
                td .es-button-border:hover a.es-button-1 {
                  background: #3559c1 !important;
                  border-color: #3559c1 !important;
                }
                td .es-button-border-2:hover {
                  background: #3559c1 !important;
                }
                @media only screen and (max-width: 600px) {
                  p,
                  ul li,
                  ol li,
                  a {
                    font-size: 16px !important;
                    line-height: 150% !important;
                  }
                  h1 {
                    font-size: 20px !important;
                    text-align: center;
                    line-height: 120% !important;
                  }
                  h2 {
                    font-size: 16px !important;
                    text-align: left;
                    line-height: 120% !important;
                  }
                  h3 {
                    font-size: 20px !important;
                    text-align: center;
                    line-height: 120% !important;
                  }
                  h1 a {
                    font-size: 20px !important;
                  }
                  h2 a {
                    font-size: 16px !important;
                    text-align: left;
                  }
                  h3 a {
                    font-size: 20px !important;
                  }
                  .es-menu td a {
                    font-size: 14px !important;
                  }
                  .es-header-body p,
                  .es-header-body ul li,
                  .es-header-body ol li,
                  .es-header-body a {
                    font-size: 10px !important;
                  }
                  .es-footer-body p,
                  .es-footer-body ul li,
                  .es-footer-body ol li,
                  .es-footer-body a {
                    font-size: 12px !important;
                  }
                  .es-infoblock p,
                  .es-infoblock ul li,
                  .es-infoblock ol li,
                  .es-infoblock a {
                    font-size: 12px !important;
                  }
                  *[class='gmail-fix'] {
                    display: none !important;
                  }
                  .es-m-txt-c,
                  .es-m-txt-c h1,
                  .es-m-txt-c h2,
                  .es-m-txt-c h3 {
                    text-align: center !important;
                  }
                  .es-m-txt-r,
                  .es-m-txt-r h1,
                  .es-m-txt-r h2,
                  .es-m-txt-r h3 {
                    text-align: right !important;
                  }
                  .es-m-txt-l,
                  .es-m-txt-l h1,
                  .es-m-txt-l h2,
                  .es-m-txt-l h3 {
                    text-align: left !important;
                  }
                  .es-m-txt-r img,
                  .es-m-txt-c img,
                  .es-m-txt-l img {
                    display: inline !important;
                  }
                  .es-button-border {
                    display: block !important;
                  }
                  .es-btn-fw {
                    border-width: 10px 0px !important;
                    text-align: center !important;
                  }
                  .es-adaptive table,
                  .es-btn-fw,
                  .es-btn-fw-brdr,
                  .es-left,
                  .es-right {
                    width: 100% !important;
                  }
                  .es-content table,
                  .es-header table,
                  .es-footer table,
                  .es-content,
                  .es-footer,
                  .es-header {
                    width: 100% !important;
                    max-width: 600px !important;
                  }
                  .es-adapt-td {
                    display: block !important;
                    width: 100% !important;
                  }
                  .adapt-img {
                    width: 100% !important;
                    height: auto !important;
                  }
                  .es-m-p0 {
                    padding: 0 !important;
                  }
                  .es-m-p0r {
                    padding-right: 0 !important;
                  }
                  .es-m-p0l {
                    padding-left: 0 !important;
                  }
                  .es-m-p0t {
                    padding-top: 0 !important;
                  }
                  .es-m-p0b {
                    padding-bottom: 0 !important;
                  }
                  .es-m-p20b {
                    padding-bottom: 20px !important;
                  }
                  .es-mobile-hidden,
                  .es-hidden {
                    display: none !important;
                  }
                  tr.es-desk-hidden,
                  td.es-desk-hidden,
                  table.es-desk-hidden {
                    width: auto !important;
                    overflow: visible !important;
                    float: none !important;
                    max-height: inherit !important;
                    line-height: inherit !important;
                  }
                  tr.es-desk-hidden {
                    display: table-row !important;
                  }
                  table.es-desk-hidden {
                    display: table !important;
                  }
                  td.es-desk-menu-hidden {
                    display: table-cell !important;
                  }
                  .es-menu td {
                    width: 1% !important;
                  }
                  table.es-table-not-adapt,
                  .esd-block-html table {
                    width: auto !important;
                  }
                  table.es-social {
                    display: inline-block !important;
                  }
                  table.es-social td {
                    display: inline-block !important;
                  }
                  a.es-button,
                  button.es-button {
                    font-size: 14px !important;
                    display: block !important;
                    border-left-width: 0px !important;
                    border-right-width: 0px !important;
                  }
                  .es-m-p5 {
                    padding: 5px !important;
                  }
                  .es-m-p5t {
                    padding-top: 5px !important;
                  }
                  .es-m-p5b {
                    padding-bottom: 5px !important;
                  }
                  .es-m-p5r {
                    padding-right: 5px !important;
                  }
                  .es-m-p5l {
                    padding-left: 5px !important;
                  }
                  .es-m-p10 {
                    padding: 10px !important;
                  }
                  .es-m-p10t {
                    padding-top: 10px !important;
                  }
                  .es-m-p10b {
                    padding-bottom: 10px !important;
                  }
                  .es-m-p10r {
                    padding-right: 10px !important;
                  }
                  .es-m-p10l {
                    padding-left: 10px !important;
                  }
                  .es-m-p15 {
                    padding: 15px !important;
                  }
                  .es-m-p15t {
                    padding-top: 15px !important;
                  }
                  .es-m-p15b {
                    padding-bottom: 15px !important;
                  }
                  .es-m-p15r {
                    padding-right: 15px !important;
                  }
                  .es-m-p15l {
                    padding-left: 15px !important;
                  }
                  .es-m-p20 {
                    padding: 20px !important;
                  }
                  .es-m-p20t {
                    padding-top: 20px !important;
                  }
                  .es-m-p20r {
                    padding-right: 20px !important;
                  }
                  .es-m-p20l {
                    padding-left: 20px !important;
                  }
                  .es-m-p25 {
                    padding: 25px !important;
                  }
                  .es-m-p25t {
                    padding-top: 25px !important;
                  }
                  .es-m-p25b {
                    padding-bottom: 25px !important;
                  }
                  .es-m-p25r {
                    padding-right: 25px !important;
                  }
                  .es-m-p25l {
                    padding-left: 25px !important;
                  }
                  .es-m-p30 {
                    padding: 30px !important;
                  }
                  .es-m-p30t {
                    padding-top: 30px !important;
                  }
                  .es-m-p30b {
                    padding-bottom: 30px !important;
                  }
                  .es-m-p30r {
                    padding-right: 30px !important;
                  }
                  .es-m-p30l {
                    padding-left: 30px !important;
                  }
                  .es-m-p35 {
                    padding: 35px !important;
                  }
                  .es-m-p35t {
                    padding-top: 35px !important;
                  }
                  .es-m-p35b {
                    padding-bottom: 35px !important;
                  }
                  .es-m-p35r {
                    padding-right: 35px !important;
                  }
                  .es-m-p35l {
                    padding-left: 35px !important;
                  }
                  .es-m-p40 {
                    padding: 40px !important;
                  }
                  .es-m-p40t {
                    padding-top: 40px !important;
                  }
                  .es-m-p40b {
                    padding-bottom: 40px !important;
                  }
                  .es-m-p40r {
                    padding-right: 40px !important;
                  }
                  .es-m-p40l {
                    padding-left: 40px !important;
                  }
                }
              </style>
            </head>
            <body
              style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"
            >
              <div class="es-wrapper-color" style="background-color:#FAFAFA">
                <!--[if gte mso 9]>
                  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#fafafa"></v:fill>
                  </v:background>
                <![endif]-->
                <table
                  class="es-wrapper"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA"
                >
                  <tr style="border-collapse:collapse">
                    <td valign="top" style="padding:0;Margin:0">
                      <table
                        class="es-content"
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"
                      >
                        <tr style="border-collapse:collapse">
                          <td style="padding:0;Margin:0;background-color:#FAFAFA" bgcolor="#fafafa" align="center">
                            <table
                              class="es-content-body"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"
                              cellspacing="0"
                              cellpadding="0"
                              bgcolor="#ffffff"
                              align="center"
                            >
                              <tr style="border-collapse:collapse">
                                <td
                                  align="left"
                                  style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                  >
                                    <tr style="border-collapse:collapse">
                                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          width="100%"
                                          role="presentation"
                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                        >
                                          <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0;font-size:0px">
                                              <img
                                                src="https://${process.env
                                                  .NEXT_PUBLIC_VERCEL_URL}/images/nessy-cloud-logo.png"
                                                alt
                                                style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                width="160"
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr style="border-collapse:collapse">
                                <td
                                  style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:transparent"
                                  bgcolor="transparent"
                                  align="left"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                  >
                                    <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                        <table
                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top"
                                          width="100%"
                                          cellspacing="0"
                                          cellpadding="0"
                                          role="presentation"
                                        >
                                          <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0">
                                              <p
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#3A3B3F"
                                              >
                                                Hallo&nbsp;${salutation ? salutation + ' ' : ''}${title
                                                  ? title + ' '
                                                  : ''}${firstName}
                                                ${lastName},
                                              </p>
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0">
                                              <p
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#3A3B3F"
                                              >
                                                Ihr Zugang zu unserem Online-Beratungsportal NESSY wurde erfolgreich
                                                eingerichtet.<br /><br />Für die erste Anmeldung folgen Sie bitte dem
                                                Link:
                                              </p>
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td
                                              align="left"
                                              style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"
                                            >
                                              <span
                                                class="es-button-border es-button-border-2"
                                                style="border-style:solid;border-color:#3D5CA3;background:#5771DB;border-width:0px;display:inline-block;border-radius:8px;width:auto;color:#FFFFFF;"
                                                ><a
                                                  href="https://${process.env.NEXT_PUBLIC_VERCEL_URL}"
                                                  target="_blank"
                                                  class="es-button es-button-1"
                                                  target="_blank"
                                                  style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#FFFFFF;border-style:solid;border-color:#5771DB;border-width:15px 20px 15px 25px;display:inline-block;background:#5771DB;border-radius:8px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center"
                                                  >https://${process.env.NEXT_PUBLIC_VERCEL_URL}
                                                  <!--[if !mso]><!-- --><img
                                                    src="https://${process.env
                                                      .NEXT_PUBLIC_VERCEL_URL}/images/external-link.png"
                                                    alt="icon"
                                                    width="16"
                                                    align="absmiddle"
                                                    style="display:inline-block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;vertical-align:middle;margin-left:10px" />
                                                  <!--<![endif]--></a
                                              ></span>
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0">
                                              <p
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#3A3B3F"
                                              >
                                                Als Zugangsdaten für Ihre erste Anmeldung verwenden Sie bitte:
                                              </p>
                                              <br />
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0">
                                              <p
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#3A3B3F"
                                              >
                                                Benutzername:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span
                                                  style="color:#5771DB"
                                                  >${email}</span
                                                ><br />Vorläufiges Passwort: <strong>${password}</strong><br /><br />
                                                Aus Sicherheitsgründen werden Sie nach der ersten Anmeldung aufgefordert
                                                Ihr Passwort zu ändern!<br /><br />
                                                Bitte verwenden Sie ein Passwort mit mindestens 8 Zeichen. Dabei sollten
                                                Sie mindestens:<br />• einen Großbuchstaben,<br />• einen
                                                Kleinbuchstaben und<br />• eine Zahl
                                              </p>
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0;padding-top:10px">
                                              <p
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#3A3B3F"
                                              >
                                                verwenden.<br /><br />Bei Fragen oder Problemen stehen wir Ihnen gerne
                                                unter den unten aufgeführten Kontaktdaten zur Verfügung.
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr class="es-mobile-hidden" style="border-collapse:collapse">
                                <td
                                  align="left"
                                  style="padding:0;Margin:0;padding-bottom:10px;padding-top:20px;padding-right:40px"
                                >
                                  <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:126px" valign="top"><![endif]-->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="es-left"
                                    align="left"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"
                                  >
                                    <tr style="border-collapse:collapse">
                                      <td
                                        class="es-m-p0r es-m-p20b"
                                        valign="top"
                                        align="center"
                                        style="padding:0;Margin:0;width:126px"
                                      >
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          width="100%"
                                          role="presentation"
                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                        >
                                          <tr style="border-collapse:collapse">
                                            <td
                                              align="center"
                                              style="padding:0;Margin:0;padding-left:20px;font-size:0px"
                                            >
                                              <img
                                                src="https://${process.env
                                                  .NEXT_PUBLIC_VERCEL_URL}/images/dfk-nord-logo.png"
                                                alt
                                                style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                width="106"
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <!--[if mso]></td><td style="width:20px"></td><td style="width:414px" valign="top"><![endif]-->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="right"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                  >
                                    <tr style="border-collapse:collapse">
                                      <td align="left" style="padding:0;Margin:0;width:414px">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          width="100%"
                                          role="presentation"
                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                        >
                                          <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0">
                                              <p
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#232D58"
                                              >
                                                T: <a href="tel:+49(0)41066380310">+49 (0)4106 6380 310</a>
                                              </p>
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0">
                                              <p
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#232D58"
                                              >
                                                E: <a href="mailto:support@dfknord.de">support@dfknord.de</a>
                                              </p>
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0">
                                              <p
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#232D58"
                                              >
                                                A: Kieler Str. 97a - 25451 Quickborn
                                              </p>
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0">
                                              <a href="https://www.dfknord.de" target="_blank"
                                                ><p
                                                  style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#232D58"
                                                >
                                                  www.dfknord.de
                                                </p></a
                                              >
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <!--[if mso]></td></tr></table><![endif]-->
                                </td>
                              </tr>
                              <tr style="border-collapse:collapse">
                                <td align="left" style="padding:0;Margin:0">
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                  >
                                    <tr style="border-collapse:collapse">
                                      <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          width="100%"
                                          role="presentation"
                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                        >
                                          <!--[if !mso]><!-- -->
                                          <tr
                                            class="es-desk-hidden"
                                            style="display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all;border-collapse:collapse"
                                          >
                                            <td
                                              align="left"
                                              style="padding:0;Margin:0;padding-top:20px;padding-left:20px;font-size:0px"
                                            >
                                              <img
                                                src="https://${process.env
                                                  .NEXT_PUBLIC_VERCEL_URL}/images/dfk-nord-logo.png"
                                                alt
                                                style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                width="110"
                                              />
                                            </td>
                                          </tr>
                                          <!--<![endif]-->
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr style="border-collapse:collapse">
                                <td align="left" style="padding:0;Margin:0">
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                  >
                                    <tr style="border-collapse:collapse">
                                      <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          width="100%"
                                          role="presentation"
                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                        >
                                          <!--[if !mso]><!-- -->
                                          <tr
                                            class="es-desk-hidden"
                                            style="display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all;border-collapse:collapse"
                                          >
                                            <td
                                              align="left"
                                              style="padding:0;Margin:0;padding-bottom:10px;padding-left:20px"
                                            >
                                              <p
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#232D58"
                                              >
                                                <br style="font-size:14px" />T: +49 (0)4106 6380 310<br />E:
                                                support@dfknord.de<br />A: Kieler Str. 97a - 25451 Quickborn<br />www.dfknord.de
                                              </p>
                                            </td>
                                          </tr>
                                          <!--<![endif]-->
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr style="border-collapse:collapse">
                                <td
                                  align="left"
                                  style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                  >
                                    <tr style="border-collapse:collapse">
                                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          width="100%"
                                          role="presentation"
                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                        >
                                          <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0;padding-bottom:20px">
                                              <p
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:11px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:17px;color:#232D58"
                                              >
                                                Diese E-Mail enthält vertrauliche und/oder rechtlich geschützte
                                                Informationen. Wenn Sie nicht der richtige Adressat sind oder diese
                                                E-Mail irrtümlich erhalten, informieren Sie bitte sofort den Absender
                                                und vernichten Sie diese Mail. Das unerlaubte Kopieren sowie die
                                                unbefugte Weitergabe dieser Mail ist nicht gestattet.
                                              </p>
                                              <p
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:11px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:17px;color:#232D58"
                                              >
                                                Allgemeine Informationen zur Datenverarbeitung im Rahmen unserer
                                                Geschäftstätigkeit gemäß DSGVO sind
                                                <a href="https://nessy.dfknord.de/datenschutz" target="_blank">hier</a>
                                                abrufbar.
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </body>
          </html>`,
      }}
    />
  );
};
export default ResetPasswordEmail;
