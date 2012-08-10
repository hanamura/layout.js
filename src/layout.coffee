oldLayout = @layout
layout = {}

if module?.exports?
	module.exports = layout
else
	@layout = layout
	layout.noConflict = =>
		@layout = oldLayout
		layout



# functions
noScale = (area, target, positionX = 0.5, positionY = 0.5) ->
	x: area.x + (area.width - target.width) * positionX
	y: area.y + (area.height - target.height) * positionY
	width: target.width
	height: target.height

showAll = (area, target, positionX = 0.5, positionY = 0.5) ->
	r =
		x: target.x
		y: target.y

	if target.width > 0 and target.height > 0
		areaRatio = area.width / area.height
		targetRatio = target.width / target.height
		
		if areaRatio > targetRatio
			r.width = target.width * (area.height / target.height)
			r.height = area.height
		else if areaRatio < targetRatio
			r.width = area.width
			r.height = target.height * (area.width / target.width)
		else
			r.width = area.width
			r.height = area.height

	noScale(area, r, positionX, positionY)

noBorder = (area, target, positionX = 0.5, positionY = 0.5) ->
	r =
		x: target.x
		y: target.y

	if target.width > 0 && target.height > 0
		areaRatio = area.width / area.height
		targetRatio = target.width / target.height
		
		if areaRatio > targetRatio
			r.width = area.width
			r.height = target.height * (area.width / target.width)
		else if areaRatio < targetRatio
			r.width = target.width * (area.height / target.height)
			r.height = area.height
		else
			r.width = area.width
			r.height = area.height

	noScale(area, r, positionX, positionY)

exactFit = (area, target) ->
	x: area.x
	y: area.y
	width: area.width
	height: area.height

wall = (area, target, positionX = 0.5, positionY = 0.5) ->
	if area.width >= target.width and area.height >= target.height
		noScale(area, target, positionX, positionY)
	else
		showAll(area, target, positionX, positionY)



# export
layout.noScale = noScale
layout.showAll = showAll
layout.noBorder = noBorder
layout.exactFit = exactFit
layout.wall = wall