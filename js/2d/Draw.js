("use strict");

export default class Draw {
  constructor(ctx, type, pos, props, config = {}) {
    switch (type) {
      case "arc":
        return this.drawArc(ctx, pos, props, config);
        break;
      case "rect":
        return this.drawRect(ctx, pos, props, config);
        break;
      case "line":
        return this.drawLine(ctx, pos, props, config);
        break;
      case "text":
        return this.drawText(ctx, pos, props, config);
        break;
      case "image":
        return this.drawImage(ctx, pos, props, config);
        break;
    }
  }
  drawArc(ctx, pos, props, config) {
    ctx.save();

    Object.assign(ctx, config.props);
    config.display.translate &&
      ctx.translate(config.display.translate[0], config.display.translate[1]);
    config.display.rotate && ctx.rotate(config.display.rotate);
    config.display.scale &&
      ctx.scale(config.display.scale[0], config.display.scale[1]);
    ctx.beginPath();
    ctx.arc(
      pos.x,
      pos.y,
      props.size.x,
      props.start ?? 0,
      props.end ?? Math.PI * 2,
      props.counterClockwise ?? false
    );
    config.display.close && ctx.closePath();
    config.display.fill && ctx.fill();
    config.display.stroke && ctx.stroke();

    ctx.restore();
  }
  drawRect(ctx, pos, props, config) {
    ctx.save();

    Object.assign(ctx, config.props);
    config.display.translate &&
      ctx.translate(config.display.translate[0], config.display.translate[1]);
    config.display.rotate && ctx.rotate(config.display.rotate);
    config.display.scale &&
      ctx.scale(config.display.scale[0], config.display.scale[1]);
    config.display.fill &&
      ctx.fillRect(pos.x, pos.y, props.size.x, props.size.y);
    config.display.stroke &&
      ctx.strokeRect(pos.x, pos.y, props.size.x, props.size.y);

    ctx.restore();
  }
  drawLine(ctx, pos, props, config) {
    ctx.save();

    Object.assign(ctx, config.props);
    config.display.translate &&
      ctx.translate(config.display.translate[0], config.display.translate[1]);
    config.display.rotate && ctx.rotate(config.display.rotate);
    config.display.scale &&
      ctx.scale(config.display.scale[0], config.display.scale[1]);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    for (let i = 0; i < props.points.length; ++i) {
      ctx.lineTo(props.points[i].x, props.points[i].y);
    }
    config.display.close && ctx.closePath();
    config.display.fill && ctx.fill();
    config.display.stroke && ctx.stroke();

    ctx.restore();
  }
  drawText(ctx, pos, props, config) {
    ctx.save();

    Object.assign(ctx, config.props);
    config.display.translate &&
      ctx.translate(config.display.translate[0], config.display.translate[1]);
    config.display.rotate && ctx.rotate(config.display.rotate);
    config.display.scale &&
      ctx.scale(config.display.scale[0], config.display.scale[1]);
    config.display.fill && ctx.fillText(props.text, pos.x, pos.y);
    config.display.stroke && ctx.strokeText(props.text, pos.x, pos.y);

    ctx.restore();
  }
  drawImage(ctx, pos, props, config) {
    ctx.save();

    Object.assign(ctx, config.props);
    config.display.translate &&
      ctx.translate(config.display.translate[0], config.display.translate[1]);
    config.display.rotate && ctx.rotate(config.display.rotate);
    config.display.scale &&
      ctx.scale(config.display.scale[0], config.display.scale[1]);
    ctx.drawImage(
      props.img,
      props.srcPos.x,
      props.srcPos.y,
      props.srcSize.x,
      props.srcSize.Y,
      pos.x,
      pos.y,
      props.size.x,
      props.size.y
    );

    ctx.restore();
  }
}
