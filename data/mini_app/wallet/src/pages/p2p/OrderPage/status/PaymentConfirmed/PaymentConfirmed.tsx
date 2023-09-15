import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import { CryptoCurrency } from 'api/wallet/generated';

import RoutePaths from 'routePaths';

import { MainButton } from 'components/MainButton/MainButton';

import { printCryptoAmount } from 'utils/common/currency';

import { useLanguage } from 'hooks/utils/useLanguage';

import { OrderPageContext } from '../../OrderPage';
import { OrderStatus } from '../../components/OrderStatus/OrderStatus';

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

export const PaymentConfirmed = () => {
  const { t } = useTranslation();
  const { order, isUserBuyer } = useContext(OrderPageContext);
  const navigate = useNavigate();
  const languageCode = useLanguage();

  if (!order) {
    return null;
  }

  const resultText = printCryptoAmount({
    amount: +order.volume.amount,
    currency: order.volume.currencyCode as CryptoCurrency,
    languageCode,
    currencyDisplay: 'code',
  });

  const suTitle = t(
    `${
      isUserBuyer
        ? `p2p.order_detail.x_amount_will_be_deposited`
        : `p2p.order_detail.x_amount_will_be_withdrawn`
    }`,
    {
      amount: resultText,
    },
  );

  return (
    <>
      <OrderStatus
        icon="sandclock"
        title={t('p2p.order_detail.payment_confirmed')}
        subTitle={suTitle}
        isSendAppeal
      />

      <div data-testid="tgcrawl" />

      <MainButton
        text={t('p2p.order_detail.open_market').toLocaleUpperCase()}
        onClick={() => navigate(generatePath(RoutePaths.P2P_HOME))}
        color={button_color}
        textColor={button_text_color}
      />
    </>
  );
};
