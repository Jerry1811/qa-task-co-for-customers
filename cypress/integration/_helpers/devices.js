const mobile = {
  name: 'iPhone',
  viewport: [320, 568],
  isMobile: true,
}

const tablet = {
  name: 'ipad (vertical)',
  viewport: [768, 1024],
  isMobile: true,
}

const desktop = {
  name: 'Laptop',
  viewport: [1366, 768],
  isMobile: false,
}

export const devices = [mobile, tablet, desktop]
