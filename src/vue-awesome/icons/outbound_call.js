import Icon from 'vue-awesome/components/Icon'
import './outbound_call.styl'

// TODO: Merge 'outbound_call' and 'phone_out'. They refer to the same icon but in different colors.

Icon.register({
  outbound_call: {
    width: 30,
    height: 30,
    raw: `
    <g id="icon-outbound-call" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-30.000000, -540.000000)">
            <g transform="translate(15.000000, 76.000000)">
                <g transform="translate(0.000000, 414.000000)">
                    <g transform="translate(0.000000, 35.000000)">
                        <g id="phone-receiver-copy-2" transform="translate(15.000000, 15.000000)">
                            <path d="M29.2451105,23.7992835 C29.1981628,23.6011294 29.0633839,23.4298657 28.8099513,23.2726268 L22.8570784,19.7541005 L22.8225214,19.7541005 L22.6442756,19.6470397 C22.562494,19.5979187 22.4073607,19.5634229 22.1730096,19.5634229 C21.8488343,19.5634229 21.5816246,19.6652845 21.3741839,19.8473614 L19.5593808,21.6952191 C19.421692,21.8329976 19.256152,21.9221758 19.0595866,21.9878473 C18.8928369,22.0434364 18.7604384,22.0740118 18.6159084,22.0740118 L18.4685996,22.0594029 L18.0722351,21.9800056 C17.7250135,21.9107068 17.2885701,21.7348411 16.7344979,21.4517262 C16.1968864,21.1770223 15.5463255,20.7597406 14.7759223,20.198179 C13.9970344,19.6302245 13.1201247,18.8459756 12.1524515,17.855788 C11.1504608,16.8749409 10.3718401,16.0025636 9.81476578,15.2333 C9.2634134,14.4719378 8.85103508,13.8195093 8.58122706,13.2793603 C8.25373294,12.6473528 8.0383562,12.0726405 7.93870381,11.5491244 L7.92547453,11.4088786 C7.92547453,11.2538132 7.9564076,11.099047 8.01155408,10.9334997 C8.0768944,10.737351 8.16611486,10.5715479 8.30376623,10.4338068 L9.85995263,8.87660609 C10.0308465,8.70560088 10.1412521,8.49764307 10.1964242,8.2354045 C10.2442413,8.0081253 10.2178116,7.82299649 10.1079925,7.62706535 L6.74049447,1.22873965 C6.64027229,1.07114499 6.52190637,0.942251072 6.38327033,0.838206264 C6.30279464,0.777810157 6.2175657,0.75 6.10300313,0.75 C5.92647753,0.75 5.77655505,0.815633837 5.61722097,0.975071769 L1.36468776,5.22891011 C1.22890785,5.35119167 1.10604867,5.52113711 0.998379079,5.74431235 C0.889404698,5.97019213 0.819171257,6.18575794 0.78539652,6.39184375 C0.781702971,6.49299005 0.771703227,6.68496357 0.754139916,7.00130922 C0.736422125,7.32043733 0.774826787,7.79600478 0.873067276,8.41532326 C0.97228098,9.04077699 1.1642697,9.79912117 1.44972762,10.6866578 C1.73206484,11.5644917 2.16004443,12.5535361 2.73426216,13.6513211 C3.30864219,14.7495126 4.0724172,15.9527385 5.02568146,17.2591979 C5.9742604,18.5591348 7.17588034,19.9273739 8.63736291,21.3690042 C10.465672,23.2193456 12.1832552,24.6688686 13.7864503,25.7176765 C15.4020562,26.7746543 16.8389429,27.5631564 18.0937091,28.0836815 C19.3445163,28.6025885 20.3902445,28.9245882 21.2225877,29.0520188 C22.087423,29.1844238 22.7074031,29.25 23.0624147,29.25 C23.2080907,29.25 23.3224207,29.2455662 23.4004851,29.2377816 C23.4889536,29.2289333 23.5471889,29.2234853 23.5923818,29.2206056 C23.7997584,29.1872431 24.0168747,29.1167242 24.2449028,29.0065315 C24.4674044,28.8991598 24.6371409,28.7762523 24.7886528,28.6095777 L29.0104966,24.4169099 C29.2007239,24.2265037 29.2702307,24.0402315 29.2451105,23.7992835 Z" id="icon-outbound-call__path-1" stroke="#43C04E" stroke-width="1.5" fill-rule="nonzero"></path>
                            <path d="M22.0606602,9 L17.802408,13.2582521 C17.5095148,13.5511454 17.0346411,13.5511454 16.7417479,13.2582521 C16.4488546,12.9653589 16.4488546,12.4904852 16.7417479,12.197592 L21,7.93933983 L21,0 L30,0 L30,9 L22.0606602,9 Z M27.4393398,1.5 L21,1.5 L21,7.93933983 L27.4393398,1.5 Z M28.5,2.56066017 L22.0606602,9 L28.5,9 L28.5,2.56066017 Z" id="icon-outbound-call__path-2" fill="#43C04E"></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
    `
  }
})
