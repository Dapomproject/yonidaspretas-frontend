import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
// Diretiva personalizada para exibir uma tooltip
@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input('tooltip') tooltipTitle: string | any; // O título da tooltip (texto a ser exibido)
  @Input() placement: string | any; // Define a posição da tooltip (topo, fundo, esquerda, direita)
  @Input() delay: string | any; // Define o tempo de transição da tooltip
  tooltip: HTMLElement | any; // Variável para armazenar a referência à tooltip
 
  offset = 10; // Distância entre o elemento host (ao qual a diretiva é aplicada) e a tooltip

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  // Escuta o evento 'mouseenter' para mostrar a tooltip
  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) { this.show(); }
  }

  // Escuta o evento 'mouseleave' para esconder a tooltip
  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) { this.hide(); }
  }

   // Função para exibir a tooltip
  show() {
    this.create();  // Cria a tooltip
    this.setPosition(); // Define a posição da tooltip em relação ao elemento host
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show'); // Adiciona a classe CSS que exibe a tooltip
  }

  // Função para esconder a tooltip
  hide() {
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show'); // Remove a classe CSS que exibe a tooltip
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.tooltip); // Remove a tooltip do DOM
      this.tooltip = null; // Limpa a referência da tooltip
    }, this.delay); // Aguarda o tempo de transição antes de remover do DOM
  }

    // Função que cria a tooltip (elemento HTML)
  create() {
    this.tooltip = this.renderer.createElement('span'); // Cria o elemento 'span' para a tooltip

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle) // Cria um nó de texto com o conteúdo da tooltip
    );

    this.renderer.appendChild(document.body, this.tooltip); // Adiciona a tooltip ao corpo do documento

     // Adiciona classes para estilização
    this.renderer.addClass(this.tooltip, 'ng-tooltip'); 
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);

     // Define as propriedades de transição da tooltip
    this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
  }

  // Função para definir a posição da tooltip com base no elemento host e na posição escolhida
  setPosition() {

    const hostPos = this.el.nativeElement.getBoundingClientRect();  // Posição do elemento host no viewport
    const tooltipPos = this.tooltip.getBoundingClientRect();  // Posição da tooltip

    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; // Posição de rolagem da página

    let top, left;

    // Define a posição com base na escolha de 'placement'
    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    // Define o estilo de posição (topo e esquerda) da tooltip
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}
