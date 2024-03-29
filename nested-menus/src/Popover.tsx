import type { OverlayTriggerState } from 'react-stately';
import type { AriaPopoverProps } from '@react-aria/overlays';
import React, { ReactNode, useRef } from 'react';
import { usePopover, DismissButton, Overlay } from '@react-aria/overlays';

interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: ReactNode;
  state: OverlayTriggerState;
}

export function Popover(props: PopoverProps) {
  let ref = useRef<HTMLDivElement>(null);
  let { state, children } = props;

  let { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef: ref,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className='fixed inset-0' />
      <div
        {...popoverProps}
        ref={ref}
        className='z-10 shadow-lg border border-gray-300 bg-white rounded-md mt-2 ml-1.5'
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
